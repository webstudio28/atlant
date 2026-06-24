export type PartnerReference = {
  id: string;
  nameBg: string;
  nameEn: string;
  logo?: string;
  document: string;
};

const REF_BASE = "/images/gallery/refferences";

/** Priority partners shown first; remainder follow in stable order */
export const PARTNER_REFERENCES: PartnerReference[] = [
  {
    id: "dsk",
    nameBg: "ДСК",
    nameEn: "DSK Bank",
    logo: "/images/partners/dsk.svg",
    document: `${REF_BASE}/DSK.jpg`,
  },
  {
    id: "mun-plovdiv",
    nameBg: "Община Пловдив",
    nameEn: "Municipality of Plovdiv",
    logo: "/images/partners/mun-plovdiv.png",
    document: `${REF_BASE}/MUN-PLOVDIV.jpg`,
  },
  {
    id: "dhl",
    nameBg: "DHL",
    nameEn: "DHL",
    logo: "/images/partners/dhl.svg",
    document: `${REF_BASE}/DHL.jpg`,
  },
  {
    id: "cinema-city",
    nameBg: "Cinema City",
    nameEn: "Cinema City",
    logo: "/images/partners/cinema-city.svg",
    document: `${REF_BASE}/cinema_city.jpg`,
  },
  {
    id: "kamenitza",
    nameBg: "Каменица",
    nameEn: "Kamenitza",
    logo: "/images/partners/kamenitza.svg",
    document: `${REF_BASE}/KAMENITZA.jpg`,
  },
  {
    id: "bg-radio",
    nameBg: "БГ Радио",
    nameEn: "BG Radio",
    logo: "/images/partners/bg-radio.png",
    document: `${REF_BASE}/bg_radio.jpg`,
  },
  {
    id: "schneider",
    nameBg: "Schneider Electric",
    nameEn: "Schneider Electric",
    logo: "/images/partners/schneider.svg",
    document: `${REF_BASE}/shnaider.jpg`,
  },
  {
    id: "obb",
    nameBg: "ОББ",
    nameEn: "United Bulgarian Bank",
    logo: "/images/partners/obb.png",
    document: `${REF_BASE}/OBB.jpg`,
  },
  {
    id: "schenker",
    nameBg: "DB Schenker",
    nameEn: "DB Schenker",
    logo: "/images/partners/schenker.svg",
    document: `${REF_BASE}/shenker.jpg`,
  },
  {
    id: "btl",
    nameBg: "BTL Industries",
    nameEn: "BTL Industries",
    logo: "/images/partners/btl.png",
    document: `${REF_BASE}/btl.jpg`,
  },
  {
    id: "eurosped",
    nameBg: "Eurosped",
    nameEn: "Eurosped",
    logo: "/images/partners/eurosped.svg",
    document: `${REF_BASE}/EUROSPED.jpg`,
  },
  {
    id: "ted",
    nameBg: "ТЕД Керамика",
    nameEn: "TED Keramika",
    logo: "/images/partners/ted.png",
    document: `${REF_BASE}/TED.jpg`,
  },
  {
    id: "avanguardia",
    nameBg: "Avanguardia",
    nameEn: "Avanguardia",
    document: `${REF_BASE}/AVANGUARDIA.jpg`,
  },
  {
    id: "ns-parket",
    nameBg: "НС Паркет",
    nameEn: "NS Parket",
    logo: "/images/partners/ns-parket.png",
    document: `${REF_BASE}/NS-PARKET.jpg`,
  },
  {
    id: "linemex",
    nameBg: "ЛИНЕМЕКС",
    nameEn: "Linemex",
    document: `${REF_BASE}/LINEMEX.jpg`,
  },
  {
    id: "zikyamov",
    nameBg: "Печатница Зикямов",
    nameEn: "Zikyamov Printing",
    document: `${REF_BASE}/ZIKYAMOV.jpg`,
  },
];

export const PRIORITY_PARTNER_COUNT = 7;
