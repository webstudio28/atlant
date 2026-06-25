export type ServiceTopicFooterItem =
  | string
  | { type: "inquiry"; label: string };

export type ServiceTopic = {
  title: string;
  intro?: string;
  points: { title: string; text: string }[];
  footer?: ServiceTopicFooterItem[];
};

/** @deprecated Use ServiceTopic */
export type TransportTopic = ServiceTopic;
