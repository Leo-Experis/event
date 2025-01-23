import { ChangeProfilePicture } from "../../../components/profilePicture";
import "./style.css";
export default function ProfilePicturePage() {
  return (
    <div className="profile-picture-page">
      <div className="profile-picture-container">
        <div className="profile-picture-header">
          <h1>Profile Picture Page</h1>
        </div>

        <ChangeProfilePicture />
      </div>
      <div className="color-gradient-1"></div>
      <div className="color-gradient-2"></div>
      <div className="color-gradient-3"></div>
    </div>
  );
}
