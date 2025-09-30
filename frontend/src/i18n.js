import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        experiences: 'Experiencias',
        tournaments: 'Torneos',
        contact: 'Contacto',
        login: 'Ingresar',
        about: 'Sobre nosotros',
        handicap: 'Consultar handicap',
      },
      coming_soon: 'Próximamente',
      hero: {
        headline: 'Vive experiencias de golf inolvidables',
        sub: 'Viajes, torneos y beneficios exclusivos en los mejores destinos',
        cta: 'Explorar experiencias',
      },
      home: { featured: 'Experiencias destacadas', see_more: 'Ver más' },
      about: {
        title: 'Sobre nosotros',
        p1: 'Somos Green Pass, una empresa argentina creada por golfistas, para golfistas. Nos especializamos en diseñar viajes que combinan la pasión por el deporte con experiencias a medida en el destino que vos elijas.',
        p2: 'Nuestro diferencial es la personalización: creamos viajes únicos cuidando cada detalle para que tu experiencia sea inolvidable. Olvidate de la logística: nosotros nos ocupamos de todo para que vos y tu grupo disfruten al máximo.',
        vision_title: 'Visión',
        vision_text: 'Ser la empresa líder en el diseño de viajes de golf que motiven a las personas a vivir grandes momentos, transformando cada viaje en una experiencia única.',
        mission_title: 'Misión',
        mission_text: 'Inspirar a los golfistas a viajar creando experiencias de golf a medida en los destinos más icónicos de Argentina, con un servicio integral y exclusivo.',
      },
      how: {
        title: '¿Cómo funciona?',
        step1: { title: 'Elegí tu destino', text: 'Seleccioná entre nuestras experiencias premium de golf.' },
        step2: { title: 'Nos ocupamos', text: 'Traslados, reservas y organización completa del viaje.' },
        step3: { title: 'Disfrutá a pleno', text: 'Hospedaje, canchas top y gastronomía en un solo lugar.' },
      },
      footer: {
        rights: 'Todos los derechos reservados',
      },
      contact: {
        request_info: 'Solicitar información',
        first_name: 'Nombre',
        last_name: 'Apellido',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        golf_id: 'Matrícula de golf',
        send: 'Enviar',
      },
      handicap: {
        title: 'Consultá tu hándicap',
        subtitle: 'Buscá por matrícula o por apellido',
        matricula: 'Matrícula',
        apellido: 'Apellido',
        search: 'Buscar',
        searching: 'Buscando...',
        error: 'No se pudo consultar el hándicap',
        columns: { matricula: 'Matrícula', nombre: 'Nombre', apellido: 'Apellido', club: 'Club', handicap: 'Hándicap' }
      },
      cta: {
        access_title: 'Accedé a tu experiencia',
        access_sub: 'Ingresá para ver tus viajes, itinerarios y beneficios exclusivos.',
        login: 'Ingresar',
      },
      packages: {
        llao: {
          title: 'Llao Llao Experience',
          desc: 'Golf, lujo y naturaleza en el corazón de Bariloche.',
          long: 'Disfrutá de una experiencia premium en Bariloche, combinando golf, spa y naturaleza en el icónico hotel Llao Llao.',
          services: ['3 noches en Llao Llao Resort','2 green fees en Arelauquen y Llao Llao Golf','Traslados privados','Desayuno buffet']
        },
        chapelco: {
          title: 'Patagonia Experience',
          desc: 'Doble destino: Bariloche y San Martín de los Andes.',
          long: 'Experiencia premium en la Patagonia Argentina. Un viaje a uno de los destinos más emblemáticos del país, iniciando en Bariloche para luego continuar en San Martín de los Andes.',
          services: [
            'Alquiler de van de lujo para traslados on demand del grupo',
            '2 noches alojamiento en casa. Bariloche',
            'Green Fees en Arelauquen y Llao Llao Golf',
            '2 noches alojamiento en casa. San Martín de los Andes',
            'Green Fees en Chapelco y El Desafío',
            'Experiencias Gastronómicas (2 cenas en restaurantes icónicos)',
            'Kit de Bienvenida',
            'Gift Card (Válido para compras iniciales)',
            'App y sistema de competencia para seguimiento del grupo',
            'Premios y Sorteos'
          ]
        },
        terrOn: {
          title: 'Córdoba Golf Experience',
          desc: 'Golf en Potrerillo, Valle del Golf y El Terrón.',
          long: 'Descubrí Córdoba con alojamiento exclusivo y experiencias gastronómicas únicas.',
          services: [
            'Alojamiento en casa Potrerillo de Larreta. Córdoba.',
            'Green Fees en Potrerillo, Valle del Golf, El Terrón',
            'Experiencias Gastronómicas: Asado de autor + Cata de vino',
            'Kit de Bienvenida',
            'Gift Card (Válido para compras iniciales)',
            'App y sistema de competencia para seguimiento del grupo',
            'Premios y Sorteos'
          ]
        },
        costa: {
          title: 'Costa Norte',
          desc: 'Pinamar, Costa Esmeralda y Cariló.',
          long: 'Escapada de golf frente al mar con experiencias gastronómicas en la costa norte.',
          services: [
            'Alojamiento en casa Costa Esmeralda. Pinamar',
            'Green Fees en Pinamar, Costa Esmeralda y Cariló',
            'Experiencias Gastronómicas (2 cenas en restaurantes icónicos)',
            'Kit de Bienvenida',
            'Gift Card (Válido para compras iniciales)',
            'App y sistema de competencia para seguimiento del grupo',
            'Premios y Sorteos'
          ]
        },
        tandil: {
          title: 'Entre las Sierras',
          desc: 'Tandil y su entorno serrano.',
          long: 'Viví la sierra de Tandil con golf, cenas y experiencias únicas.',
          services: [
            'Alojamiento en casa de Campo. Tandil',
            'Green Fees en El Valle de Tandil + Tandil Golf Club',
            'Experiencias Gastronómicas. Cena + Cata de vino en Época de Quesos',
            'Kit de Bienvenida',
            'Gift Card (Válido para compras iniciales)',
            'App y sistema de competencia para seguimiento del grupo',
            'Premios y Sorteos'
          ]
        },
        mendoza: {
          title: 'Costa Sur',
          desc: 'Chapadmalal y Mar del Plata.',
          long: 'Golf y gastronomía en la costa sur bonaerense.',
          services: [
            'Alojamiento en casa Chapadmalal. Mar del Plata.',
            'Green Fees en Acantilados, Sierra de los Padres y Marayuí',
            'Experiencias Gastronómicas.',
            'Asado de autor + Cata de vino',
            'Kit de Bienvenida',
            'Gift Card (Válido para compras iniciales)',
            'App y sistema de competencia para seguimiento del grupo',
            'Premios y Sorteos'
          ]
        }
      },
      package: {
        not_found: 'Paquete no encontrado',
        back_home: 'Volver al inicio',
        includes: 'Incluye:',
        reveal_price: 'Descubrí el valor aproximado',
        per_person: 'por persona',
        register_error: 'No se pudo registrar la visualización',
      },
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        experiences: 'Experiences',
        tournaments: 'Tournaments',
        contact: 'Contact',
        login: 'Sign In',
        about: 'About us',
        handicap: 'Check your handicap',
      },
      coming_soon: 'Coming soon',
      hero: {
        headline: 'Live unforgettable golf experiences',
        sub: 'Trips, tournaments and exclusive benefits in top destinations',
        cta: 'Explore experiences',
      },
      home: { featured: 'Featured experiences', see_more: 'See more' },
      about: {
        title: 'About us',
        p1: 'We are Green Pass: created by golfers, for golfers. We design bespoke golf trips across Argentina’s most iconic destinations.',
        p2: 'Our edge is personalization. We craft unique journeys and handle all logistics so your group only focuses on enjoying.',
        vision_title: 'Vision',
        vision_text: 'To be the leading company in golf travel design, inspiring people to live memorable moments through unique experiences.',
        mission_title: 'Mission',
        mission_text: 'Inspire golfers to travel with tailor‑made golf experiences in Argentina, delivered through an integral and exclusive service.',
      },
      how: {
        title: 'How it works',
        step1: { title: 'Choose your destination', text: 'Pick from our premium golf experiences.' },
        step2: { title: 'We handle it', text: 'Transfers, bookings and end‑to‑end trip organization.' },
        step3: { title: 'Enjoy to the fullest', text: 'Lodging, top courses and cuisine in one place.' },
      },
      footer: {
        rights: 'All rights reserved',
      },
      contact: {
        request_info: 'Request information',
        first_name: 'First name',
        last_name: 'Last name',
        email: 'Email',
        phone: 'Phone',
        golf_id: 'Golf ID',
        send: 'Send',
      },
      handicap: {
        title: 'Check your handicap',
        subtitle: 'Search by member ID or last name',
        matricula: 'Member ID',
        apellido: 'Last name',
        search: 'Search',
        searching: 'Searching...',
        error: 'Could not fetch handicap',
        columns: { matricula: 'Member ID', nombre: 'First name', apellido: 'Last name', club: 'Club', handicap: 'Handicap' }
      },
      cta: {
        access_title: 'Access your experience',
        access_sub: 'Log in to view your trips, itineraries, and exclusive benefits.',
        login: 'Sign in',
      },
      packages: {
        llao: {
          title: 'Llao Llao Experience',
          desc: 'Golf, luxury and nature in the heart of Bariloche.',
          long: 'Enjoy a premium experience in Bariloche, combining golf, spa and nature at the iconic Llao Llao hotel.',
          services: ['3 nights at Llao Llao Resort','2 green fees at Arelauquen & Llao Llao Golf','Private transfers','Breakfast included']
        },
        chapelco: {
          title: 'Chapelco Adventure',
          desc: 'Play golf in Patagonia, with unique landscapes.',
          long: 'Golf and adventure in Patagonia. Play one of South America’s top courses with Andes views.',
          services: ['4 nights at Loi Suites Chapelco','3 rounds of golf','Airport-hotel transfers','Optional outdoor activities']
        },
        terrOn: {
          title: 'El Terrón Golf Week',
          desc: 'A week of golf and relaxation in Córdoba.',
          long: 'A full week in Córdoba with unlimited golf, gourmet cuisine and total relaxation.',
          services: ['5 nights at Estancia El Terrón','Unlimited green fees','Personalized golf lessons','Gourmet dinner included']
        },
        costa: {
          title: 'Atlantic Coast Golf',
          desc: 'Seaside golf at the best courses on Argentina’s coast.',
          long: 'Seaside golf combining sport and rest at the best coastal courses in Argentina.',
          services: ['3 nights at a beachfront hotel','2 green fees at Mar del Plata GC & Acantilados','Spa access and breakfast included','Internal transfers']
        },
        tandil: {
          title: 'Tandil Golf Experience',
          desc: 'Golf in a unique mountain setting.',
          long: 'Discover a unique hilly environment, perfect for golf and relaxation in natural landscapes.',
          services: ['2 nights at a boutique hotel in Tandil','Green fees at Tandil Golf Club','Visit to a local craft brewery','Breakfast and transfers included']
        },
        mendoza: {
          title: 'Golf & Wine in Mendoza',
          desc: 'Wine, golf and mountains in the wine region.',
          long: 'Wine, golf and mountains: an unbeatable combination in the heart of the wine region.',
          services: ['3 nights at a 4-star hotel in Chacras de Coria','Green fees at Club de Campo Mendoza','Winery tour with tasting','Airport-hotel-winery transfers']
        }
      },
      package: {
        not_found: 'Package not found',
        back_home: 'Back to home',
        includes: 'Includes:',
        reveal_price: 'Reveal approximate price',
        per_person: 'per person',
        register_error: 'Unable to register view',
      },
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;


