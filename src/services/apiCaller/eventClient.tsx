import { EventProp } from "../../proptypes/EventProp";
import { get, post, putBlob } from "../apiClient";

async function createEvent(event: EventProp) {
  return await post("events", event, true);
}

async function getEvents() {
  return await get("events", true);
}

async function putEventPicture(id: number, imageBlob: Blob) {
  return await putBlob(`events/addImage/${id}`, imageBlob, true);
}

export { createEvent, getEvents, putEventPicture };
