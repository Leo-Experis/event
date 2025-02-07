import { createContext, ReactNode, useState } from "react";
import { EventProp, EventResponseProp } from "../proptypes/EventProp";
import { MyErrorResponse } from "../proptypes/ResponseProp";
import {
  createEvent,
  getEventById,
  getEvents,
  putEventPicture,
} from "../services/apiCaller/eventClient";

interface EventContextType {
  events: EventProp[];
  createEvents: (
    event: EventProp
  ) => Promise<EventResponseProp | MyErrorResponse>;
  fetchEvents: () => Promise<EventProp[]>;
  uploadEventImage: (
    id: number,
    image: Blob
  ) => Promise<EventResponseProp | MyErrorResponse>;
  fetchEventById: (id: number) => Promise<EventResponseProp | MyErrorResponse>;
}

const EventContext = createContext<EventContextType>({
  events: [],
  createEvents: () => {
    return Promise.resolve<EventResponseProp | MyErrorResponse>({
      status_code: 500,
      data: {
        id: 0,
        eventCreatorId: 0,
        eventDate: "",
        eventDescription: "",
        eventName: "",
        eventPicture: "",
      },
    });
  },
  fetchEvents: () => {
    return Promise.resolve<EventProp[]>([]);
  },
  uploadEventImage: () => {
    return Promise.resolve<EventResponseProp | MyErrorResponse>({
      status_code: 500,
      data: {
        id: 0,
        eventCreatorId: 0,
        eventDate: "",
        eventDescription: "",
        eventName: "",
        eventPicture: "",
      },
    });
  },
  fetchEventById: () => {
    return Promise.resolve<EventResponseProp | MyErrorResponse>({
      status_code: 500,
      data: {
        id: 0,
        eventCreatorId: 0,
        eventDate: "",
        eventDescription: "",
        eventName: "",
        eventPicture: "",
      },
    });
  },
});

const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, _setEvents] = useState<EventProp[]>([]);

  const createEvents = async (event: EventProp) => {
    const res = await createEvent(event);
    console.log(res);
    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    };
  };

  const fetchEvents = async () => {
    const res = await getEvents();
    _setEvents(res.data);
    return events;
  };

  const fetchEventById = async (id: number) => {
    const res = await getEventById(id);
    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    };
  };

  const uploadEventImage = async (id: number, image: Blob) => {
    const res = await putEventPicture(id, image);

    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    };
  };

  const value = {
    events,
    createEvents,
    fetchEvents,
    uploadEventImage,
    fetchEventById,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export { EventProvider, EventContext };
