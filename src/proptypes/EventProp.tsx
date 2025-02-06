import { MyResponse } from "./ResponseProp";

interface EventProp {
  id: number;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventPicture: string;
  eventCreatorId: number;
}

interface EventResponseProp
  extends MyResponse<{
    id: number;
    eventName: string;
    eventDate: string;
    eventDescription: string;
    eventPicture: string;
    eventCreatorId: number;
  }> {}

export type { EventProp, EventResponseProp };
