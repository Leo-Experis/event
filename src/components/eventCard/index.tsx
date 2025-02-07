import "./style.css";
import MyButton from "../myButton";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { EventProp } from "../../proptypes/EventProp";

const MyEventCard = ({ event }: { event: EventProp }) => {
  const navigate = useNavigate();
  const interested = true;
  const createImageFromString = (eventImage: string) => {
    const byteCharacters = atob(eventImage);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const image = new Blob([byteArray], { type: "image/jpeg" });

    return new URL(URL.createObjectURL(image));
  };

  const goToEvent = () => {
    navigate(`/event/${event.id}`);
  };

  const interestedClick = () => {};

  return (
    <div className="event-card-body">
      <div
        className="event-card-background"
        style={{
          backgroundImage: `url(${createImageFromString(event.eventPicture)})`,
        }}
        onClick={goToEvent}
      ></div>
      <div className="card-info-body">
        <div className="date-title-div">
          <p className="date-title">{event.eventDate}</p>
        </div>
        <div className="event-title" onClick={goToEvent}>
          <p>
            {event.eventCreatorId} - {event.eventName}
          </p>
        </div>
        <div className="button-actions">
          <MyButton
            backgroundColor={interested ? "#000000" : "#E8E7EA"}
            color={interested ? "#ffffff" : "#000000"}
            className="interested-button"
            onClick={interestedClick}
          >
            <GradeIcon />
            <p>Interested</p>
          </MyButton>
          <MyButton
            backgroundColor="#E8E7EA"
            color="#000000"
            className="share-button"
          >
            <ShareIcon />
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
