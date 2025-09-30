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
import i18n from '../i18n.js';
// Public image fallback
const playaGrandePublic = "/img/playa_grande_golf.jpg";

export const paquetes = [
  {
    id: "llao-llao",
    precio: "U$D 1.500 por persona",
    priceUSD: 1500,
    get title() { return i18n.t('packages.llao.title', 'Llao Llao Experience'); },
    image: llaoWebp || llaoJpg,
    get description() { return i18n.t('packages.llao.desc', 'Golf, lujo y naturaleza en el corazón de Bariloche.'); },
    detail: {
      alt: "Llao Llao",
      get descripcion() { return i18n.t('packages.llao.long', 'Disfrutá de una experiencia premium en Bariloche, combinando golf, spa y naturaleza en el icónico hotel Llao Llao.'); },
      get servicios() { return i18n.t('packages.llao.services', { returnObjects: true, defaultValue: [
        '3 noches en Llao Llao Resort',
        '2 green fees en Arelauquen y Llao Llao Golf',
        'Traslados privados',
        'Desayuno buffet',
      ]}); },
    },
  },
  {
    id: "chapelco",
    precio: "U$D 1.100 por persona",
    priceUSD: 1100,
    get title() { return i18n.t('packages.chapelco.title', 'Chapelco Adventure'); },
    image: chapelcoWebp || chapelcoJpg,
    get description() { return i18n.t('packages.chapelco.desc', 'Disfrutá del golf en la Patagonia, con paisajes únicos.'); },
    detail: {
      alt: "Chapelco",
      get descripcion() { return i18n.t('packages.chapelco.long', 'Golf y aventura en la Patagonia. Jugá en uno de los mejores campos de Sudamérica con vista a los Andes.'); },
      get servicios() { return i18n.t('packages.chapelco.services', { returnObjects: true, defaultValue: [
        '4 noches en Loi Suites Chapelco',
        '3 rondas de golf',
        'Traslados aeropuerto-hotel',
        'Actividades outdoor opcionales',
      ]}); },
    },
  },
  {
    id: "el-terron",
    precio: "U$D 1.000 por persona",
    priceUSD: 1000,
    get title() { return i18n.t('packages.terrOn.title', 'El Terrón Golf Week'); },
    image: elterronWebp || elterronJpg,
    get description() { return i18n.t('packages.terrOn.desc', 'Una semana de golf y relax en Córdoba.'); },
    detail: {
      alt: "El Terrón",
      get descripcion() { return i18n.t('packages.terrOn.long', 'Una semana en Córdoba con golf ilimitado, gastronomía gourmet y relax total.'); },
      get servicios() { return i18n.t('packages.terrOn.services', { returnObjects: true, defaultValue: [
        '5 noches en Estancia El Terrón',
        'Green fees ilimitados',
        'Clases de golf personalizadas',
        'Cena gourmet incluida',
      ]}); },
    },
  },
  {
    id: "costa",
    precio: "U$D 900 por persona",
    priceUSD: 900,
    get title() { return i18n.t('packages.costa.title', 'Costa Atlántica Golf'); },
    image: costaWebp || costaJpg,
    get description() { return i18n.t('packages.costa.desc', 'Golf frente al mar en los mejores campos de la costa argentina.'); },
    detail: {
      alt: "Costa Atlántica",
      get descripcion() { return i18n.t('packages.costa.long', 'Golf frente al mar, combinando deporte y descanso en los mejores campos de la costa argentina.'); },
      get servicios() { return i18n.t('packages.costa.services', { returnObjects: true, defaultValue: [
        '3 noches en hotel frente al mar',
        '2 green fees en Mar del Plata Golf Club y Acantilados',
        'Acceso al spa y desayuno incluido',
        'Traslados internos',
      ]}); },
    },
  },
  {
    id: "tandil",
    precio: "U$D 900 por persona",
    priceUSD: 900,
    get title() { return i18n.t('packages.tandil.title', 'Tandil Golf Experience'); },
    image: tandilWebp || tandilJpg,
    get description() { return i18n.t('packages.tandil.desc', 'Golf en un entorno serrano único.'); },
    detail: {
      alt: "Tandil",
      get descripcion() { return i18n.t('packages.tandil.long', 'Descubrí un entorno serrano único, ideal para jugar golf y relajarte en paisajes naturales.'); },
      get servicios() { return i18n.t('packages.tandil.services', { returnObjects: true, defaultValue: [
        '2 noches en hotel boutique en Tandil',
        'Green fees en Tandil Golf Club',
        'Visita a cervecería local',
        'Desayuno y traslados incluidos',
      ]}); },
    },
  },
  {
    id: "mendoza",
    precio: "U$D 950 por persona",
    priceUSD: 950,
    get title() { return i18n.t('packages.mendoza.title', 'Golf & Wine en Mendoza'); },
    image: playaGrandePublic || mendozaWebp || mendozaJpg,
    get description() { return i18n.t('packages.mendoza.desc', 'Vino, golf y montañas en la región vitivinícola.'); },
    detail: {
      alt: "Mendoza",
      get descripcion() { return i18n.t('packages.mendoza.long', 'Vino, golf y montañas: una combinación inmejorable en el corazón de la región vitivinícola.'); },
      get servicios() { return i18n.t('packages.mendoza.services', { returnObjects: true, defaultValue: [
        '3 noches en hotel 4 estrellas en Chacras de Coria',
        'Green fees en Club de Campo Mendoza',
        'Tour por bodegas con degustación',
        'Traslados aeropuerto-hotel-bodega',
      ]}); },
    },
  },
];
