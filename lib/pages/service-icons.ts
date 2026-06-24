/** Icons copied from the old Angular site (assets/services/*-removebg-preview.png). */
const SERVICE_ICONS: Record<string, string> = {
  // Transport
  "/avtomobilen-transport": "/images/service-icons/transport/automobile.png",
  "/vazdushen-transport": "/images/service-icons/transport/air.png",
  "/morski-transport": "/images/service-icons/transport/sea.png",
  "/zhelezopaten-transport": "/images/service-icons/transport/rail.png",
  "/specilalizirano-premestvane-i-transport": "/images/service-icons/transport/specialized.png",
  // Warehouse
  "/skladovi-uslugi/korporativno": "/images/service-icons/warehouse/corporate.png",
  "/skladovi-uslugi/individualno": "/images/service-icons/warehouse/individual.png",
  // Relocations
  "/premestvane/na-doma": "/images/service-icons/relocations/home.png",
  "/premestvane/na-ofis": "/images/service-icons/relocations/office.png",
  "/premestvane/mezhdunarodno": "/images/service-icons/relocations/international.png",
  "/specializirano-premestvane": "/images/service-icons/relocations/specialized.png",
  "/premestvane/industrialno": "/images/service-icons/relocations/industrial.png",
  // Loading
  "/hamalski-uslugi": "/images/service-icons/loading/porters.png",
  "/tovaro-raztovarni-uslugi/pomoshten": "/images/service-icons/loading/support.png",
};

export function getServiceIcon(href?: string): string | undefined {
  if (!href) return undefined;
  return SERVICE_ICONS[href];
}

/** @deprecated Use getServiceIcon */
export function getTransportServiceIcon(href?: string): string | undefined {
  return getServiceIcon(href);
}
