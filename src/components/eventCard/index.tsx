import "./style.css";
import MyButton from "../myButton";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";

const MyEventCard = ({
  title,
  owner,
  date,
  interested,
  eventImage,
}: {
  title: string;
  owner: string;
  date: string;
  interested: boolean;
  eventImage: string;
}) => {
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

  return (
    <div
      className="event-card-body"
      style={{ backgroundImage: `url(${createImageFromString(eventImage)})` }}
    >
      <div className="card-info-body">
        <div className="date-title-div">
          <p className="date-title">{date}</p>
        </div>
        <div className="event-title">
          <p>
            {owner} - {title}
          </p>
        </div>
        <div className="button-actions">
          <MyButton
            backgroundColor={interested ? "#000000" : "#E8E7EA"}
            color={interested ? "#ffffff" : "#000000"}
            className="interested-button"
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
