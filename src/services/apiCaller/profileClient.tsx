
import { ProfileProp } from "../../proptypes/ProfileProp";
import { get, post } from "../apiClient";

async function createProfile(profile: ProfileProp) {
    return await post("/profile", profile, true);
}

async function getProfile(id: number) {
    return await get(`/profile/${id}`, true)
}

async function getAllProfiles() {
    return await get("/profile", true);
}

export { createProfile, getProfile, getAllProfiles }