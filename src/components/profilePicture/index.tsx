import { useState } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import MyButton from "../myButton";
import "./style.css";
import useProfile from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import OnSave from "../saveImage";

const MyProfilePicture = ({ imgString }: { imgString: string }) => {
  return (
    <div
      className="profile-picture-logo"
      style={{ backgroundImage: `url(${imgString})` }}
    ></div>
  );
};

const CenterAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const ChangeProfilePicture = () => {
  const { setProfilePicture } = useProfile();
  const [profilePicture, _setProfilePicture] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const navigate = useNavigate();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  /*
  const [rotate, setRotate] = useState(0);
   const [aspect, setAspect] = useState<number | undefined>(4 / 3);
  */

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        _setProfilePicture(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (4 / 3 /* aspect variable*/) {
      const { width, height } = e.currentTarget;
      setCrop(CenterAspectCrop(width, height, 4 / 3 /* aspect variable*/));
    }
  };

  return (
    <div className="change-profile-picture-box">
      {profilePicture ? (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={4 / 3} /* aspect variable*/
            minWidth={300}
            circularCrop={true}
          >
            <img
              alt="Crop me"
              src={profilePicture}
              style={{ transform: `scale(${1}) rotate(${0}deg)` }}
              className="added-image"
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <div className="change-profile-picture-button">
            <MyButton
              className="login-button"
              title="Change Profile Picture"
              onClick={() => document.getElementById("fileInput")?.click()}
            ></MyButton>
          </div>
        </div>
      ) : (
        <div
          className="empty-profile-picture-div"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div className="empty-profile-picture-text">
            <img
              src="/icons/camera-icon.svg"
              alt="camera-icon"
              className="add-profile-picture-icon"
            ></img>
            <p>Click here to add a profile picture</p>
          </div>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        onChange={onSelectFile}
        style={{ display: "none" }}
      />

      {profilePicture ? (
        <div className="save-profile-picture-button">
          <MyButton
            className="login-button"
            title="Next"
            onClick={async () => {
              if (completedCrop) {
                const saved = await OnSave({ completedCrop, profilePicture });
                if (saved.status === 200) {
                  setProfilePicture(saved.base64Image);
                  navigate("/");
                }
              }
            }}
          ></MyButton>
        </div>
      ) : null}
    </div>
  );
};

export { MyProfilePicture, ChangeProfilePicture, CenterAspectCrop };
