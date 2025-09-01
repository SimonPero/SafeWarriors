export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const apellido = data.get("apellido");
    const nombre = data.get("nombre");
    const email = data.get("email");
    const ocupacion = data.get("ocupacion");
    const telefono = data.get("telefono");

    // Validación de campos requeridos
    if (!apellido || !nombre || !email || !telefono) {
      return new Response(
        JSON.stringify({
          message: "Completa nombre, apellido, email y teléfono.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Enviando email con datos:", {
      apellido,
      nombre,
      email,
      telefono,
    });

    const sendResend = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "warriorssafe@gmail.com",
      subject: `Contacto Safe Warriors`,
      html: `
        <h2>Nuevo contacto desde el formulario</h2>
        <p><strong>Apellido:</strong> ${apellido}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Ocupación:</strong> ${ocupacion || "No especificada"}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <hr/>
        <p>Muchas gracias por ponerte en contacto con nosotros. En el más pronto tiempo te llegará un mensaje por WhatsApp.</p>
      `,
    });

    console.log("Respuesta de Resend:", sendResend);

    // Verificar si hay errores en la respuesta de Resend
    if (sendResend.error) {
      console.error("Error de Resend:", sendResend.error);
      return new Response(
        JSON.stringify({
          message: "Error al enviar el email ❌",
          error: sendResend.error,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Si no hay error, consideramos que fue exitoso
    // Resend puede devolver data como null pero aún así ser exitoso
    console.log("Email enviado exitosamente");
    return new Response(
      JSON.stringify({
        message: "Mensaje enviado con éxito ✅",
        id: sendResend.data?.id || "unknown",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error inesperado:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor ❌",
        error: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
