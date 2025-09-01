import { useState, useEffect } from "react";
import gmailLogo from "../assets/gmailLogo.png";
import "./popUp.css";

export default function WhatsAppPopup() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        body: formData,
      });

      const responseText = await res.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        throw new Error(`Respuesta no es JSON válida: ${responseText}`);
      }

      if (res.ok && res.status === 200) {
        setStatus("success");
        setMessage(data.message || "Mensaje enviado con éxito ✅");

        if (form && typeof form.reset === "function") {
          form.reset();
        }
      } else {
        setStatus("error");
        setMessage(
          data.message || data.error || `Error del servidor (${res.status})`
        );
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? `Error: ${err.message}`
          : "Error de conexión. Intenta más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setShow(true)} className="popup-trigger-button">
        <img
          src={gmailLogo.src}
          alt="Open Form"
          className="contact-icon"
          loading="lazy"
        />
      </button>

      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="name-fields-group">
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    placeholder="Apellido"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email de contacto</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email de contacto"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ocupacion">Ocupación actual</label>
                <input
                  type="text"
                  id="ocupacion"
                  name="ocupacion"
                  placeholder="Ocupación actual"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Número de WhatsApp (+54)</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="+54 9 1112345678"
                  pattern="^\+54\d{9,12}$"
                  title="Debe comenzar con +54 y contener entre 10 y 12 dígitos adicionales"
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>

              {status && (
                <p
                  className={`form-message ${
                    status === "success" ? "success" : "error"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
