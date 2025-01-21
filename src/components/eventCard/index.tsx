import "./style.css";
import MyButton from "../myButton";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";

const MyEventCard = ({
  title,
  owner,
  date,
  interested,
}: {
  title: string;
  owner: string;
  date: string;
  interested: boolean;
}) => {
  return (
    <div className="event-card-body">
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
