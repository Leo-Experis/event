import { useEffect } from "react";
import MyEventCard from "../../../components/eventCard";
import { MyProfilePicture } from "../../../components/profilePicture";
import useEvent from "../../../hooks/useEvent";
import useProfile from "../../../hooks/useProfile";
import "./style.css";
export default function MyEventPage() {
  const { profile } = useProfile();
  const { fetchEvents, events } = useEvent();
  const { getProfilePicture } = useProfile();

  useEffect(() => {
    const fetchData = async () => {
      await fetchEvents();
    };

    fetchData();
  }, []);
  
  return (
    <div className="main-body">
      <div className="welcome-back-parent">
        <div className="welcome-back-message">
          <h2>Welcome Back!</h2>
          <h3>{profile.username}</h3>
        </div>

        <MyProfilePicture imgString={getProfilePicture()} />
      </div>
      <div className="my-event-title">
        <p>My events</p>
      </div>
      <div className="main-events">
        {events.map((event) => (
          <MyEventCard
            key={event.id}
            title={event.eventName}
            owner={event.eventCreatorId.toString()}
            date={event.eventDate}
            interested={false}
            eventImage={event.eventPicture}
          />
        ))}

        <div className="main-events-footer"></div>
      </div>
    </div>
  );
}
