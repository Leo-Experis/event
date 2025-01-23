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

const MyProfilePicture = ({ imgString }: { imgString: string }) => {
  return (
    <div
      className="profile-picture-logo"
      style={{ backgroundImage: `url(${imgString})` }}
    ></div>
  );
};

const centerAspectCrop = (
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
      setCrop(centerAspectCrop(width, height, 4 / 3 /* aspect variable*/));
    }
  };

  const onSave = () => {
    if (!completedCrop || !profilePicture) {
      return;
    }

    const image = new Image();
    image.src = profilePicture;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY
        );
        const base64Image = canvas.toDataURL("image/png");
        // Save base64Image to your database
        //JUST FOR FUN, THIS IS GOING TO SAVE TO DATABASE
        setProfilePicture(base64Image);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(blob);
            }
          },
          "image/png",
          1
        );
        console.log(base64Image);
        navigate("/");
      }
    };
  };

  return (
    <div className="change-profile-picture-box">
      {profilePicture ? (
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
            onLoad={onImageLoad}
          />
        </ReactCrop>
      ) : (
        <div className="empty-profile-picture-div"></div>
      )}
      <div className="change-profile-picture-button">
        <MyButton
          className="login-button"
          title="Select Profile Picture"
          onClick={() => document.getElementById("fileInput")?.click()}
        ></MyButton>
        <input
          id="fileInput"
          type="file"
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
      </div>

      {profilePicture ? (
        <div className="save-profile-picture-button">
          <MyButton
            className="login-button"
            title="Next"
            onClick={onSave}
          ></MyButton>
        </div>
      ) : null}
    </div>
  );
};

export { MyProfilePicture, ChangeProfilePicture };
