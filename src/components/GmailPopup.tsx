import { useState, useEffect } from "react";
import gmailLogo from "../assets/gmailLogo.png";
import "./popUp.css";

export default function WhatsAppPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <button onClick={() => setShow(true)} className="popup-trigger-button">
        <img
          src={gmailLogo.src}
          alt="Open Form"
          className="contact-icon"
          loading={"lazy"}
        />
      </button>

      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="contact-form">
              <div className="name-fields-group">
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input type="text" id="apellido" placeholder="Apellido" />
                </div>

                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" placeholder="Nombre" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email de contacto</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email de contacto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ocupacion">Ocupación actual</label>
                <input
                  type="text"
                  id="ocupacion"
                  placeholder="Ocupación actual"
                />
              </div>

              <div className="form-group">
                <label htmlFor="establecimiento">Empresa donde trabajas</label>
                <input
                  type="text"
                  id="establecimiento"
                  placeholder="Establecimiento"
                />
              </div>

              <button type="submit" className="submit-button">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
