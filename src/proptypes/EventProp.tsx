interface EventProp {
  id: number
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventPicture: string;
  eventCreatorId: number;
}

interface EventResponseProp {
  status_code: number;
  data: EventProp;
}

export type { EventProp, EventResponseProp };
