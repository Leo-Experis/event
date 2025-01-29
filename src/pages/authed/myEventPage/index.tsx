import MyEventCard from "../../../components/eventCard";
import { MyProfilePicture } from "../../../components/profilePicture";
import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import "./style.css";
export default function MyEventPage() {
  const { username } = useAuth();
  const { getProfilePicture } = useProfile();
  console.log(getProfilePicture());
  return (
    <div className="main-body">
      <div className="welcome-back-parent">
        <div className="welcome-back-message">
          <h2>Welcome Back!</h2>
          <h3>{username}</h3>
        </div>

        <MyProfilePicture imgString={getProfilePicture()} />
      </div>
      <div className="my-event-title">
        <p>My events</p>
      </div>
      <div className="main-events">
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={true}
        />

        <div className="main-events-footer"></div>
      </div>
    </div>
  );
}
