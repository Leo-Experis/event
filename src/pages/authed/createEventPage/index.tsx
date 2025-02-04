import DatePicker from "react-datepicker";
import MyButton from "../../../components/myButton";
import MyInputField from "../../../components/myInputField";
import "./style.css";
import { useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { CenterAspectCrop } from "../../../components/profilePicture";
import OnSave from "../../../components/saveImage";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { EventProp } from "../../../proptypes/EventProp";
import useEvent from "../../../hooks/useEvent";
import { MyErrorResponse } from "../../../proptypes/ResponseProp";

export default function CreateEventPage() {
  const { userId } = useAuth();
  const { createEvents, uploadEventImage } = useEvent();
  const [eventDate, _setEventDate] = useState<Date | null>();
  const [eventImage, _setEventImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [newEvent, _setNewEvent] = useState<EventProp>({
    id: 0,
    eventName: "",
    eventDate: "",
    eventDescription: "",
    eventPicture: "",
    eventCreatorId: userId,
  });
  const [error, setError] = useState<MyErrorResponse>();

  const aspect = 16 / 9;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    _setNewEvent({ ...newEvent, [name]: value });
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        _setEventImage(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect /* aspect variable*/) {
      const { width, height } = e.currentTarget;
      setCrop(CenterAspectCrop(width, height, aspect /* aspect variable*/));
    }
  };

  const onSubmit = async () => {
    const res = await createEvents(newEvent);
    if ("data" in res) {
      console.log(res.data.id);
      if (completedCrop && eventImage) {
        const saved = await OnSave({
          completedCrop,
          savePicture: eventImage,
        });
        if (saved.status === 200) {
          const uploadImageRes = await uploadEventImage(
            res.data.id,
            saved.image!
          );
          if ("data" in uploadImageRes) {
            navigate("/");
          }
        }
      }
    } else {
      setError({
        error: true,
        status_code: res.status_code,
        message: res.message,
      });
    }
  };

  return (
    <div className="create-event-page-main">
      <div className="create-event-page-body">
        <div className="create-event-page-title">
          <h1>Create Event</h1>
        </div>
        <div className="create-event-page-input">
          {eventImage ? (
            <div className="event-image-cropper">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                maxHeight={200}
                className="event-cropper"
              >
                <img
                  alt="Crop-me"
                  src={eventImage}
                  style={{ transform: `scale(${1}) rotate(${0}deg)` }}
                  className="added-image"
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <div className="change-event-picture-button">
                <MyButton
                  className="login-button"
                  title="Change Event Picture"
                  onClick={() => document.getElementById("fileInput")?.click()}
                ></MyButton>
              </div>
            </div>
          ) : (
            <div
              className="event-image-cropper event-image-empty"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <div className="event-image-cropper-text">
                <img
                  src="/icons/camera-icon.svg"
                  alt="camera-icon"
                  className="add-profile-picture-icon"
                ></img>
                <p>Click here to add a profile picture</p>
              </div>
            </div>
          )}
          <MyInputField
            placeholder="Event Name"
            inputName="eventName"
            value={newEvent.eventName}
            onChange={handleChange}
          />
          <MyInputField
            placeholder="Event Description"
            inputName="eventDescription"
            value={newEvent.eventDescription}
            onChange={handleChange}
          />
          <div className="date-picker-div">
            <DatePicker
              showIcon={true}
              onChange={(date) => _setEventDate(date)}
              placeholderText="Start date and time"
              className="date-picker"
              dateFormat={"YYYY-MM-dd"}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              value={eventDate ? eventDate.toISOString().split("T")[0] : ""}
              icon={
                <img
                  src="/icons/uit_calender.svg"
                  alt="calendar-icon"
                  className="input-icon date-picker-icon"
                />
              }
            />
          </div>
        </div>
        {error ? (
          <div className="error-message">{error.message}</div>
        ) : (
          <div className="error-message-holder"></div>
        )}
        <div className="create-event-page-button">
          {eventImage ? (
            <MyButton
              className="login-button"
              title="Next"
              onClick={onSubmit}
            ></MyButton>
          ) : (
            <MyButton className="login-button" title="Create Event" />
          )}
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
    </div>
  );
}
