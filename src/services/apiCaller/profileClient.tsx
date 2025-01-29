import { ProfileProp } from "../../proptypes/ProfileProp";
import { get, post, putBlob } from "../apiClient";

async function createProfile(profile: ProfileProp) {
  return await post("profile", profile, true);
}

async function getProfile(id: number) {
  return await get(`profile/${id}`, true);
}

async function putProfilePicture(id: number, imageBlob: Blob) {
  return await putBlob(`profile/addImage/11`, imageBlob, true);
}

async function getAllProfiles() {
  return await get("profile", true);
}

export { createProfile, getProfile, getAllProfiles, putProfilePicture };
