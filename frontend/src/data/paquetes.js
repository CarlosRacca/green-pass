import llaoJpg from "../assets/img/llao llao golf.jpg";
import llaoWebp from "../assets/img/llao llao golf.webp";
import chapelcoJpg from "../assets/img/chapelco golf.jpg";
import chapelcoWebp from "../assets/img/chapelco golf.webp";
import elterronJpg from "../assets/img/El terron golf.jpg";
import elterronWebp from "../assets/img/El terron golf.webp";
import costaJpg from "../assets/img/costa.jpg";
import costaWebp from "../assets/img/costa.webp";
import tandilJpg from "../assets/img/tandil.jpg";
import tandilWebp from "../assets/img/tandil.webp";
import mendozaJpg from "../assets/img/mendoza.jpg";
import mendozaWebp from "../assets/img/mendoza.webp";

export const paquetes = [
  {
    id: "llao-llao",
    precio: "U$D 1.500 por persona",
    title: "Llao Llao Experience",
    image: llaoWebp || llaoJpg,
    description: "Golf, lujo y naturaleza en el corazón de Bariloche.",
    detail: {
      alt: "Llao Llao",
      descripcion:
        "Disfrutá de una experiencia premium en Bariloche, combinando golf, spa y naturaleza en el icónico hotel Llao Llao.",
      servicios: [
        "3 noches en Llao Llao Resort",
        "2 green fees en Arelauquen y Llao Llao Golf",
        "Traslados privados",
        "Desayuno buffet",
      ],
    },
  },
  {
    id: "chapelco",
    precio: "U$D 1.500 por persona",
    title: "Chapelco Adventure",
    image: chapelcoWebp || chapelcoJpg,
    description: "Disfrutá del golf en la Patagonia, con paisajes únicos.",
    detail: {
      alt: "Chapelco",
      descripcion:
        "Golf y aventura en la Patagonia. Jugá en uno de los mejores campos de Sudamérica con vista a los Andes.",
      servicios: [
        "4 noches en Loi Suites Chapelco",
        "3 rondas de golf",
        "Traslados aeropuerto-hotel",
        "Actividades outdoor opcionales",
      ],
    },
  },
  {
    id: "el-terron",
    precio: "U$D 1.500 por persona",
    title: "El Terrón Golf Week",
    image: elterronWebp || elterronJpg,
    description: "Una semana de golf y relax en Córdoba.",
    detail: {
      alt: "El Terrón",
      descripcion:
        "Una semana en Córdoba con golf ilimitado, gastronomía gourmet y relax total.",
      servicios: [
        "5 noches en Estancia El Terrón",
        "Green fees ilimitados",
        "Clases de golf personalizadas",
        "Cena gourmet incluida",
      ],
    },
  },
  {
    id: "costa",
    precio: "U$D 490 por persona",
    title: "Costa Atlántica Golf",
    image: costaWebp || costaJpg,
    description: "Golf frente al mar en los mejores campos de la costa argentina.",
    detail: {
      alt: "Costa Atlántica",
      descripcion:
        "Golf frente al mar, combinando deporte y descanso en los mejores campos de la costa argentina.",
      servicios: [
        "3 noches en hotel frente al mar",
        "2 green fees en Mar del Plata Golf Club y Acantilados",
        "Acceso al spa y desayuno incluido",
        "Traslados internos",
      ],
    },
  },
  {
    id: "tandil",
    precio: "U$D 360 por persona",
    title: "Tandil Golf Experience",
    image: tandilWebp || tandilJpg,
    description: "Golf en un entorno serrano único.",
    detail: {
      alt: "Tandil",
      descripcion:
        "Descubrí un entorno serrano único, ideal para jugar golf y relajarte en paisajes naturales.",
      servicios: [
        "2 noches en hotel boutique en Tandil",
        "Green fees en Tandil Golf Club",
        "Visita a cervecería local",
        "Desayuno y traslados incluidos",
      ],
    },
  },
  {
    id: "mendoza",
    precio: "U$D 520 por persona",
    title: "Golf & Wine en Mendoza",
    image: mendozaWebp || mendozaJpg,
    description: "Vino, golf y montañas en la región vitivinícola.",
    detail: {
      alt: "Mendoza",
      descripcion:
        "Vino, golf y montañas: una combinación inmejorable en el corazón de la región vitivinícola.",
      servicios: [
        "3 noches en hotel 4 estrellas en Chacras de Coria",
        "Green fees en Club de Campo Mendoza",
        "Tour por bodegas con degustación",
        "Traslados aeropuerto-hotel-bodega",
      ],
    },
  },
];
