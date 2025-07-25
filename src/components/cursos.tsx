import { useState } from "react";
import "./CursosIsla.css";
import defPersonalImg from "../assets/DefensaPersonal.jpg";
import extracHostilesImg from "../assets/individuosHostiles.jpg";
import bastoTelescopicoImg from "../assets/bastonTelesco.jpg";
import protDeTercerosImg from "../assets/tercerosProteccion.jpg";
import defContraArmaBlancaImg from "../assets/armablanca.jpg";
import primerosAuxImg from "../assets/auxilio.jpg";
import manejoTonfaPolicialImg from "../assets/TONFA.jpg";
import instructorSafeWarImg from "../assets/instructorWarrior.jpg";
const cursos = [
  { titulo: "CURSO DE DEFENSA PERSONAL", imagen: defPersonalImg.src },
  {
    titulo: "CURSO DE CONTROL Y EXTRACION DE INDIVIDUOS HOSTILES",
    imagen: extracHostilesImg.src,
  },
  { titulo: "CURSO DE BASTÓN TELESCÓPICO", imagen: bastoTelescopicoImg.src },
  { titulo: "CURSO DE PROTECCIÓN DE TERCEROS", imagen: protDeTercerosImg.src },
  {
    titulo: "CURSO DE DEFNSA CONTRA ARMAS BLANCAS",
    imagen: defContraArmaBlancaImg.src,
  },
  { titulo: "CURSO DE PRIMEROS AUXILIOS", imagen: primerosAuxImg.src },
  {
    titulo: "CURSO DE MANEJO DE TONFA POLICIAL",
    imagen: manejoTonfaPolicialImg.src,
  },
  {
    titulo: "CURSO DE INSTRUCTOR SAFE WARRIORS",
    imagen: instructorSafeWarImg.src,
  },
];

export default function CursosIsla() {
  const [page, setPage] = useState(0);
  const groupSize = 4;
  const totalPages = Math.ceil(cursos.length / groupSize);

  const grupos = Array.from({ length: totalPages }, (_, i) =>
    cursos.slice(i * groupSize, (i + 1) * groupSize)
  );

  return (
    <section className="cursos-container">
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{
            transform: `translateX(-${page * 50}%)`,
            width: `${totalPages * 100}%`,
          }}
        >
          {grupos.map((grupo, i) => (
            <ul key={i} className="curso-page">
              {grupo.map((curso, index) => (
                <li
                  key={index}
                  className="curso-card"
                  style={{
                    backgroundImage: `url(${curso.imagen})`,
                  }}
                >
                  <div className="curso-content">
                    <h3>{curso.titulo}</h3>
                    <button>ver más</button>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="boton-wrapper">
        <button onClick={() => setPage(page === 0 ? 1 : 0)}>
          {page === 0 ? "Cargar más" : "Cargar menos"}
        </button>
      </div>
    </section>
  );
}
