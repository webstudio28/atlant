export type ServiceTopic = {
  title: string;
  intro?: string;
  points: { title: string; text: string }[];
  footer?: string[];
};

/** @deprecated Use ServiceTopic */
export type TransportTopic = ServiceTopic;
