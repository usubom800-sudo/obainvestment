import { ResidentialComplex, Apartment } from './types';

export const EXC_RATE_USD_TO_KGS = 86.5; // Realistic conversion rate for Kyrgyz Som

export const bishkekDistricts = [
  {
    id: 'magistral-toktonaliev',
    name: 'Magistral / Toktonaliev Sector',
    description: 'An ultra-prestigious modern zone with pristine mountain ecology, advanced school hubs like Cambridge International, and absolute accessibility near Ala-Archa Mall and central green park corridors.',
    coords: { x: 42.81, y: 74.59 }
  },
  {
    id: 'southern-magistral',
    name: 'Southern Magistral (Tokombaev St)',
    description: 'The greenest, cleanest district of Bishkek with high-class residential buildings, panoramic mountain vistas, and premium private schools nearby.',
    coords: { x: 42.82, y: 74.61 }
  },
  {
    id: 'erkindik',
    name: 'Erkindik Boulevard (Dzerzhinsky)',
    description: 'Historical heart of Bishkek, flanked by majestic hundred-year-old oak trees, elegant parks, fine dining, and elite cultural centers.',
    coords: { x: 42.87, y: 74.60 }
  },
  {
    id: 'ala-archa-foothills',
    name: 'Ala-Archa Foothills (Orto-Sai)',
    description: 'Exclusive private community setting near Ala-Archa national park, boasting cleanest mountain air, security, and absolute tranquility.',
    coords: { x: 42.79, y: 74.58 }
  },
  {
    id: 'city-center',
    name: 'Administrative Center (Chuy & Erkindik)',
    description: 'The pulsing heart of the capital, surrounding administrative buildings, modern premium business hubs, and high-energy luxury life.',
    coords: { x: 42.88, y: 74.61 }
  }
];

export const residentialComplexes: ResidentialComplex[] = [
  {
    id: 'ala-archa-residence',
    name: 'OBA Ala-Archa Residence',
    tagline: 'Eco-Luxury Foothills Living',
    description: 'A masterpiece of ultra-modern architectural style situated in the elite Orto-Sai foothills near Ala-Archa. Surrounded by majestic mountain peaks and pristine natural environments, it offers residents private estates with expansive panoramic glazing and absolute quietness, away from the city noise.',
    address: 'Baitik Baatyr / Orto-Sai Foothills, Bishkek',
    district: 'Ala-Archa Foothills (Orto-Sai)',
    completionDate: 'Q3 2027',
    priceMinUSD: 240000,
    features: ['Mountain Microclimate', 'Private Terraces', 'Intelligent Air Filtration', 'Premium Club Lounge'],
    image: '/src/assets/images/premium_residence_exterior_1783314045768.jpg', // Our generated exterior
    gallery: [
      '/src/assets/images/premium_residence_exterior_1783314045768.jpg',
      '/src/assets/images/luxury_penthouse_interior_1783314062981.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      floors: 5,
      ceilingHeight: 3.6,
      wallMaterial: 'Reinforced concrete monolithic structure, eco-brick filling',
      facadeMaterial: 'Natural Sary-Tash travertine, Brazilian granite, premium composite panels'
    },
    amenities: [
      {
        icon: 'Wind',
        title: 'Pure Foothills Air',
        description: 'Positioned in the premium natural airflow canyon, delivering fresh breeze from the Ala-Archa glaciers directly to your residence.'
      },
      {
        icon: 'ShieldCheck',
        title: 'Multi-Tier VIP Security',
        description: 'Three levels of active surveillance, biometric entry cards, private checkpoint, and elite 24/7 security guard patrol.'
      },
      {
        icon: 'Trees',
        title: 'Private Park & Walkways',
        description: 'Exclusively landscaped park area covering over 1.5 hectares with exotic conifers, interactive fountains, and Zen water gardens.'
      },
      {
        icon: 'Sparkles',
        title: 'Premium Spa & Fitness',
        description: 'Private fitness complex, thermal Roman baths, 25-meter swimming pool, and dedicated private therapeutic rooms.'
      }
    ]
  },
  {
    id: 'oba-boulevard',
    name: 'OBA Erkindik Boulevard',
    tagline: 'Timeless Heritage & Prestigious Charm',
    description: 'Located directly on the historic Erkindik Boulevard (Dzerzhinka), this elite complex is built in the spirit of neo-classical architecture. Enjoy direct private access to the oak alley, custom hand-carved stone ornaments, tall architectural arches, and high-class neighborhood in Bishkek\'s most iconic boulevard.',
    address: '21 Erkindik Boulevard, Bishkek',
    district: 'Erkindik Boulevard (Dzerzhinsky)',
    completionDate: 'Q4 2026',
    priceMinUSD: 310000,
    features: ['Historical Center', 'Centennial Oak Park View', 'Floor-to-ceiling Windows', 'Smart Home System'],
    image: '/src/assets/images/luxury_penthouse_interior_1783314062981.jpg', // Penthouse interior representation
    gallery: [
      '/src/assets/images/luxury_penthouse_interior_1783314062981.jpg',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      floors: 9,
      ceilingHeight: 3.4,
      wallMaterial: 'Monolithic reinforced concrete core, natural ceramic hollow bricks',
      facadeMaterial: 'Premium white Italian marble, natural Sary-Tash limestone, forged brass railings'
    },
    amenities: [
      {
        icon: 'Crown',
        title: 'Premium Concierge',
        description: '24/7 localized white-glove service to manage reservations, private airport transfers, and elite lifestyle requests.'
      },
      {
        icon: 'Key',
        title: 'Complete Smart Integration',
        description: 'Full voice and remote tablet control of indoor climate, intelligent floor heating, motorized curtains, and custom light presets.'
      },
      {
        icon: 'Wine',
        title: 'Private Cigar & Wine Lounge',
        description: 'Exquisite reservation-only tasting salon for residents and their distinguished guests with secure personal humidor cells.'
      },
      {
        icon: 'CarFront',
        title: 'VIP Heated Parking',
        description: 'Spacious underground parking with license-plate recognition system, smart fast-charging terminals for electric vehicles.'
      }
    ]
  },
  {
    id: 'bishkek-heights',
    name: 'OBA Bishkek Heights',
    tagline: 'Modern Metropolis & Majestic Vistas',
    description: 'Rising gracefully above the Southern Magistral, OBA Bishkek Heights is a landmark of ultra-luxurious high-rise design. Melding sleek dark glass curtain walls with rich bronze accents, the towers offer unparalleled 360-degree vistas of Bishkek city and the grand snowy crown of Ala-Too peaks.',
    address: 'Aaly Tokombaev St / Asanbay, Bishkek',
    district: 'Southern Magistral (Tokombaev St)',
    completionDate: 'Q2 2028',
    priceMinUSD: 185000,
    features: ['Infinite Mountain Panoramas', 'Rooftop Infinity Pool', 'State-of-the-Art Gym', 'Private Cinema Hall'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      floors: 16,
      ceilingHeight: 3.3,
      wallMaterial: 'High-seismic-resistant monolithic frame (9 points on Richter scale)',
      facadeMaterial: 'Schuco structural panoramic double glazed glass facade, high-strength porcelain panels'
    },
    amenities: [
      {
        icon: 'Waves',
        title: 'Rooftop Infinity Sky Pool',
        description: 'Heated open-air panoramic pool offering luxurious, year-round swimming high above the clouds with mountain vistas.'
      },
      {
        icon: 'Dumbbell',
        title: 'High-Tech Athletic Club',
        description: 'Equipped with the finest premium Technogym machines, cardio theater, personal trainers, and high-grade sports bar.'
      },
      {
        icon: 'Tv',
        title: 'Private Cinema & Media Room',
        description: 'A luxurious private screening hall with Dolby Atmos theater surround sound, acoustic padding, and executive leather recliners.'
      },
      {
        icon: 'Layers',
        title: 'Executive Meeting Pods',
        description: 'Fully equipped private conference rooms and executive co-working studios designed for productive remote business.'
      }
    ]
  },
  {
    id: 'oba-magistral-toktonaliev',
    name: 'OBA Magistral-Toktonaliev',
    tagline: 'Grand Master-Planned Smart City',
    description: 'A revolutionary, high-prestige master-planned community covering 10 hectares at the intersection of Southern Magistral and Toktonaliev Street. This premier development fuses a five-star hotel, corporate grade office towers, and 47 high-performance residential buildings. Designed with 9-grade seismic resistance, 18-story high-rise blocks, and extensive green parks, it offers direct proximity to prime urban retail, premium international schools, and clean mountain glaciers.',
    address: 'Southern Magistral & Toktonaliev St, Bishkek',
    district: 'Southern Magistral (Tokombaev St)',
    completionDate: 'Q3 2029 (3-Year Frame)',
    priceMinUSD: 160000,
    features: ['10-Hectare Private Green City', '47 Master-Planned Buildings', 'Underground 10-Hectare Parking', 'Cambridge Int. School Proximity'],
    image: '/src/assets/images/oba_magistral_masterplan_1783315628791.jpg',
    gallery: [
      '/src/assets/images/oba_magistral_masterplan_1783315628791.jpg',
      '/src/assets/images/oba_magistral_condos_1783315647241.jpg',
      '/src/assets/images/oba_magistral_hotel_1783315671567.jpg',
      '/src/assets/images/oba_magistral_aerial_1783315693261.jpg'
    ],
    specs: {
      floors: 18,
      ceilingHeight: 3.3,
      wallMaterial: 'Reinforced concrete monolithic frames with class-9 seismic protection and high thermal insulation',
      facadeMaterial: 'Ventilated porcelain stoneware, structural panoramic low-E double glazing, natural warm travertine'
    },
    amenities: [
      {
        icon: 'Crown',
        title: '5-Star Hotel & Office Towers',
        description: 'Includes a luxurious five-star hotel, premium corporate business center, and dedicated executive services right at your doorstep.'
      },
      {
        icon: 'Trees',
        title: '10 Hectares of Parks & Recreation',
        description: 'Immersed in pristine mountain airflow with lush pedestrian zones, kids play gardens, running tracks, and dynamic fountain plazas.'
      },
      {
        icon: 'CarFront',
        title: '10-Hectare Underground Parking',
        description: 'A massive single-level smart underground garage spanning 10 hectares with automated fast chargers and intelligent parking sensors.'
      },
      {
        icon: 'Dumbbell',
        title: 'Fitness Hubs & Kindergartens',
        description: 'State-of-the-art sport complexes, gym centers, and private premium kindergartens integrated directly into the gated community.'
      }
    ]
  }
];

export const apartmentsData: Apartment[] = [
  // Ala-Archa Residence Apartments
  {
    id: 'aa-101',
    rooms: 2,
    area: 92,
    floor: 2,
    totalFloors: 5,
    priceUSD: 245000,
    status: 'Available',
    complexId: 'ala-archa-residence',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: false,
    smartHome: true
  },
  {
    id: 'aa-202',
    rooms: 3,
    area: 145,
    floor: 3,
    totalFloors: 5,
    priceUSD: 395000,
    status: 'Available',
    complexId: 'ala-archa-residence',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: true,
    smartHome: true
  },
  {
    id: 'aa-penthouse',
    rooms: 5,
    area: 280,
    floor: 5,
    totalFloors: 5,
    priceUSD: 850000,
    status: 'Available',
    complexId: 'ala-archa-residence',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: true,
    smartHome: true
  },

  // Erkindik Boulevard Apartments
  {
    id: 'eb-201',
    rooms: 2,
    area: 110,
    floor: 3,
    totalFloors: 9,
    priceUSD: 330000,
    status: 'Available',
    complexId: 'oba-boulevard',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: false,
    terrace: false,
    smartHome: true
  },
  {
    id: 'eb-302',
    rooms: 3,
    area: 165,
    floor: 6,
    totalFloors: 9,
    priceUSD: 495000,
    status: 'Reserved',
    complexId: 'oba-boulevard',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: true,
    smartHome: true
  },
  {
    id: 'eb-grand-penthouse',
    rooms: 6,
    area: 340,
    floor: 9,
    totalFloors: 9,
    priceUSD: 1190000,
    status: 'Available',
    complexId: 'oba-boulevard',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: true,
    smartHome: true
  },

  // Bishkek Heights Apartments
  {
    id: 'bh-505',
    rooms: 1,
    area: 65,
    floor: 5,
    totalFloors: 16,
    priceUSD: 185000,
    status: 'Available',
    complexId: 'bishkek-heights',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: false,
    terrace: false,
    smartHome: false
  },
  {
    id: 'bh-1010',
    rooms: 2,
    area: 98,
    floor: 10,
    totalFloors: 16,
    priceUSD: 285000,
    status: 'Available',
    complexId: 'bishkek-heights',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: false,
    smartHome: true
  },
  {
    id: 'bh-1402',
    rooms: 3,
    area: 142,
    floor: 14,
    totalFloors: 16,
    priceUSD: 420000,
    status: 'Available',
    complexId: 'bishkek-heights',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    mountainView: true,
    terrace: true,
    smartHome: true
  },
  {
    id: 'mt-501',
    rooms: 1,
    area: 55,
    floor: 5,
    totalFloors: 18,
    priceUSD: 160000,
    status: 'Available',
    complexId: 'oba-magistral-toktonaliev',
    image: '/src/assets/images/oba_magistral_condos_1783315647241.jpg',
    mountainView: false,
    terrace: false,
    smartHome: true
  },
  {
    id: 'mt-1202',
    rooms: 2,
    area: 85,
    floor: 12,
    totalFloors: 18,
    priceUSD: 255000,
    status: 'Available',
    complexId: 'oba-magistral-toktonaliev',
    image: '/src/assets/images/oba_magistral_condos_1783315647241.jpg',
    mountainView: true,
    terrace: false,
    smartHome: true
  },
  {
    id: 'mt-1703',
    rooms: 3,
    area: 120,
    floor: 17,
    totalFloors: 18,
    priceUSD: 375000,
    status: 'Available',
    complexId: 'oba-magistral-toktonaliev',
    image: '/src/assets/images/oba_magistral_condos_1783315647241.jpg',
    mountainView: true,
    terrace: true,
    smartHome: true
  }
];

export const clientReviews = [
  {
    name: 'Daniyar Isakov',
    role: 'Managing Partner, Isakov & Partners law firm',
    text: 'Investing with OBA Investment is the best financial decision I\'ve made in the Kyrgyz real estate market. The construction standards of Ala-Archa Residence are truly top tier, matching high Swiss benchmarks. They are honest, extremely detailed, and deliver premium luxury.',
    project: 'OBA Ala-Archa Residence'
  },
  {
    name: 'Elena Volkova',
    role: 'Founder, Elite Interiors Bishkek',
    text: 'The architecture of OBA Erkindik Boulevard is a breath of fresh air. The 3.4-meter high ceilings and the magnificent natural Sary-Tash limestone facade elevate the entire boulevard\'s presence. Their engineering team is the most precise in Kyrgyzstan.',
    project: 'OBA Erkindik Boulevard'
  },
  {
    name: 'Kubat Omuraliev',
    role: 'International Tech Investor',
    text: 'As an expat returning to Bishkek, I wanted a premium property with smart automation and panoramic mountain views. OBA Bishkek Heights exceeded all expectations. The lobby reception feels like a 5-star Mandarin Oriental, and the high-altitude air flow is incredibly clean.',
    project: 'OBA Bishkek Heights'
  }
];
