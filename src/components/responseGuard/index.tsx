import { EventResponseProp } from "../../proptypes/EventProp";
import { MyErrorResponse, MyResponse } from "../../proptypes/ResponseProp";
import { UserResponseProp } from "../../proptypes/UserProp";

function isUserResponse(res: MyResponse<any>): res is UserResponseProp {
  return res.status_code === 200 && typeof res.data === "object";
}

function isErrorResponse(res: MyResponse<any>): res is MyErrorResponse {
  return res.status_code === 400 && typeof res.data === "string";
}

function isEventResponse(res: MyResponse<any>): res is EventResponseProp {
  return res.status_code === 201 && typeof res.data === "object";
}

export { isUserResponse, isErrorResponse, isEventResponse };
