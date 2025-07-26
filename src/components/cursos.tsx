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

type Curso = {
  titulo: string;
  imagen: string;
  descripcion: string;
};

const cursos: Curso[] = [
  {
    titulo: "CURSO DE DEFENSA PERSONAL",
    imagen: defPersonalImg.src,
    descripcion:
      "En el curso de defensa personal abordaremos el entendimiento de nuestras capacidades de defensa y las capacidades ofensivas de uno o varios agresores, logrando despertar nuestras habilidades naturales de forma intuitiva y sencilla.",
  },
  {
    titulo: "CURSO DE CONTROL Y EXTRACION DE INDIVIDUOS HOSTILES",
    imagen: extracHostilesImg.src,
    descripcion:
      "En este curso abordaremos diferentes tácticas grupales e individuales para afrontar una persona agresiva y conducirla fuera de un establecimiento sin recibir daños ni causarlos, formando en nosotros una mentalidad de valoración y solución rápida de múltiples conflictos.",
  },
  {
    titulo: "CURSO DE BASTÓN TELESCÓPICO",
    imagen: bastoTelescopicoImg.src,
    descripcion:
      "El bastón telescópico es una herramienta que ofrece una amplisima gama de ventajas tácticas de defensa y ataque que sumado a la capacidad de ocultación del mismo logra ser sumamente versátil para todo personal de seguridad.",
  },
  {
    titulo: "CURSO DE PROTECCIÓN DE TERCEROS",
    imagen: protDeTercerosImg.src,
    descripcion:
      "Aquí abordaremos diferentes situaciones donde debamos intervenir para proteger la integridad física de otra persona. Ya sea en un contexto en el cual no estamos involucrados o actuando como guardaespaldas.",
  },
  {
    titulo: "CURSO DE DEFNSA CONTRA ARMAS BLANCAS",
    imagen: defContraArmaBlancaImg.src,
    descripcion:
      "Es de vital importancia no solo para el personal de seguridad sinó también para todos los ciudadanos el saber defenderse de armas punzo cortantes ya que son las más peligrosas y silenciosas.",
  },
  {
    titulo: "CURSO DE PRIMEROS AUXILIOS",
    imagen: primerosAuxImg.src,
    descripcion:
      "Es tan o más importante el saber defendernos como poder asistir a ciudadanos que han sufrido un accidente o agresión y no podemos quedarnos de brazos cruzados mientras necesitan de nuestra ayuda ya que muchas veces estamos en primera fila ante dichos hechos y la inacción es intolerable.",
  },
  {
    titulo: "CURSO DE MANEJO DE TONFA POLICIAL",
    imagen: manejoTonfaPolicialImg.src,
    descripcion:
      "La herramienta por excelencia de todo personal policial y de seguridad para terminar con amenazas inminentes sin recurrir a la letalidad ya sea contra uno o múltiples oponentes.",
  },
  {
    titulo: "CURSO DE INSTRUCTOR SAFE WARRIORS",
    imagen: instructorSafeWarImg.src,
    descripcion:
      "En este curso se capacitará y titulara al practicante para que pueda ser instructor de Safe Warriors y pueda asimismo trabajar capacitando a otros en los cursos arriba mencionados.",
  },
];

export default function CursosIsla() {
  const [page, setPage] = useState(0);
  const [cursoActivo, setCursoActivo] = useState<Curso | null>(null);
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
                  style={{ backgroundImage: `url(${curso.imagen})` }}
                >
                  <div className="curso-content">
                    <h3>{curso.titulo}</h3>
                    <button onClick={() => setCursoActivo(curso)}>
                      ver más
                    </button>
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

      {cursoActivo && (
        <div className="modal-overlay" onClick={() => setCursoActivo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{cursoActivo.titulo}</h2>
            <img
              src={cursoActivo.imagen}
              alt={cursoActivo.titulo}
              className="modal-img"
            />
            <p className="modal-desc">{cursoActivo.descripcion}</p>
            <button
              className="modal-close"
              onClick={() => setCursoActivo(null)}
            >
              ¡Contaca Ya!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
