import MyEventCard from "../../../components/eventCard";
import "./style.css"

export default function MainPage() {
    return (
        <div className="main-body">
            <div className="main-title">
                <h1>Nearby Events</h1>
            </div>
            <div className="main-events">
                <MyEventCard title="Spelning" owner="Trädgårn" date="Saturday, 12.06.2025, 11:00 AM" />
                <div className="event-card-space"></div>
                <MyEventCard title="Spelning" owner="Trädgårn" date="Saturday, 12.06.2025, 11:00 AM" />
                <div className="event-card-space"></div>
                <MyEventCard title="Spelning" owner="Trädgårn" date="Saturday, 12.06.2025, 11:00 AM" />
                <div className="event-card-space"></div>
                <MyEventCard title="Spelning" owner="Trädgårn" date="Saturday, 12.06.2025, 11:00 AM" />
            </div>

        </div>
    )
}