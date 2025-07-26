import { useState, useEffect } from "react";
import whatsappLogo from "../assets/whatsappLogo.png";
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
          src={whatsappLogo.src}
          alt="WhatsApp"
          className="contact-icon"
          loading={"lazy"}
        />
      </button>

      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          {}
          <div
            className="modal-content qr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={whatsappLogo.src}
              alt="QR de WhatsApp"
              className="qr-image"
              loading={"lazy"}
            />
            <a
              href="https://wa.me/123456789" // Replace with your actual WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="qr-contact-button"
            >
              ¡Contacta ya!
            </a>
          </div>
        </div>
      )}
    </>
  );
}
