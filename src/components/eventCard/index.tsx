import "./style.css"

const MyEventCard = ({
    title,
    owner,
    date,
}: {
    title: string;
    owner: string;
    date: string;
}
) => {
    return (
        <div className="event-card-body">
            <div className="image-parent-div">
                <div className="image-div">
                </div>
            </div>
            <div className="card-info-body">
                <div className="date-title-div">
                    <p className="date-title">{date}</p>
                </div>
                <div>
                    <p>{owner} - {title}</p>
                </div>
            </div>
        </div>
    )
}


export default MyEventCard;