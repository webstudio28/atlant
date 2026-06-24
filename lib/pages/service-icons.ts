/** Icons copied from the old Angular site (assets/services/*-removebg-preview.png). */
export const TRANSPORT_SERVICE_ICONS: Record<string, string> = {
  "/avtomobilen-transport": "/images/service-icons/transport/automobile.png",
  "/vazdushen-transport": "/images/service-icons/transport/air.png",
  "/morski-transport": "/images/service-icons/transport/sea.png",
  "/zhelezopaten-transport": "/images/service-icons/transport/rail.png",
  "/specilalizirano-premestvane-i-transport": "/images/service-icons/transport/specialized.png",
};

export function getTransportServiceIcon(href?: string): string | undefined {
  if (!href) return undefined;
  return TRANSPORT_SERVICE_ICONS[href];
}
