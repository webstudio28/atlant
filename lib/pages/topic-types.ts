export type TopicPoint = { title: string; text: string };

export type TransportTopic = {
  title: string;
  intro?: string;
  points: TopicPoint[];
  footer?: string[];
};
