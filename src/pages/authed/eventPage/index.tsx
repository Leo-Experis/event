import { useParams } from "react-router-dom";
import useEvent from "../../../hooks/useEvent";
import "./style.css";
import { useEffect, useState } from "react";
import { EventProp } from "../../../proptypes/EventProp";

const EventPage = () => {
  const { events, fetchEventById } = useEvent();
  const { eventID } = useParams();
  const [targetEvent, setTargetEvent] = useState<EventProp>();

  useEffect(() => {
    const fetchData = async () => {
      if (eventID) {
        const id = parseInt(eventID);
        if (events.length > 1) {
          console.log("Inside events ");
          console.log(events.length);
          const event = events.find((event) => event.id === id);
          if (event) {
            setTargetEvent(event);
          }
        } else {
          const res = await fetchEventById(id);
          if(res.status_code === 200) {
            setTargetEvent(res.data)
          }
        }
      }
    };

    fetchData();
  }, [events, eventID]);

  if (!targetEvent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{targetEvent.eventName}</h1>
    </div>
  );
};

export default EventPage;
