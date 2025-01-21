import MyEventCard from "../../../components/eventCard";
import "./style.css";

export default function MainPage() {
  return (
    <div className="main-body">
      <div className="main-title">
        <h1>Nearby Events</h1>
      </div>
      <div></div>
      <div className="main-events">
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />
        <MyEventCard
          title="Spelning"
          owner="Trädgårn"
          date="Saturday, 12.06.2025, 11:00 AM"
          interested={false}
        />

        <div className="main-events-footer"></div>
      </div>
    </div>
  );
}
