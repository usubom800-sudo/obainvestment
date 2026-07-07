export interface Apartment {
  id: string;
  rooms: number;
  area: number; // in sqm
  floor: number;
  totalFloors: number;
  priceUSD: number;
  status: 'Available' | 'Reserved' | 'Sold';
  complexId: string;
  image: string; // blueprint image or render
  mountainView: boolean;
  terrace: boolean;
  smartHome: boolean;
}

export interface ResidentialComplex {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  district: string; // e.g. "Southern Magistral", "Erkindik", "Asanbay"
  completionDate: string; // e.g. "Q4 2026"
  features: string[];
  priceMinUSD: number;
  image: string; // external facade render
  gallery: string[];
  specs: {
    floors: number;
    ceilingHeight: number; // in meters, e.g. 3.3
    wallMaterial: string; // e.g. "Monolithic, Red Brick"
    facadeMaterial: string; // e.g. "Natural Sary-Tash Travertine, Granite"
  };
  amenities: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface InvestmentScenario {
  downPaymentPercent: number;
  durationMonths: number;
  interestRateYearly: number; // e.g. 0% for direct company installment
}
