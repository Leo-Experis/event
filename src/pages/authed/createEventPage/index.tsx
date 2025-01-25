import DatePicker from "react-datepicker";
import MyButton from "../../../components/myButton";
import MyInputField from "../../../components/myInputField";
import "./style.css";
import { useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { CenterAspectCrop } from "../../../components/profilePicture";

export default function CreateEventPage() {
  const [eventDate, _setEventDate] = useState<Date | null>();
  const [eventImage, _setEventImage] = useState<string | null>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const aspect = 16 / 9;
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
            placeholder="Event Description"
            inputName="eventDescription"
            value=""
            onChange={() => {}}
          />
          <div className="date-picker-div">
            <DatePicker
              showIcon={true}
              onChange={(date) => _setEventDate(date)}
              placeholderText="Select your Date of Birth"
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
          <MyInputField
            placeholder="Event Time"
            inputName="eventTime"
            value=""
            onChange={() => {}}
          />
          <MyInputField
            placeholder="Event Location"
            inputName="eventLocation"
            value=""
            onChange={() => {}}
          />
          <MyInputField
            placeholder="Event Image"
            inputName="eventImage"
            value=""
            onChange={() => {}}
          />
          <MyInputField
            placeholder="Event Category"
            inputName="eventCategory"
            value=""
            onChange={() => {}}
          />
          <MyInputField
            placeholder="Event Price"
            inputName="eventPrice"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="create-event-page-button">
          <MyButton title="Create Event" />
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
