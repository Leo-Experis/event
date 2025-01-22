import { UserProp } from "../../proptypes/UserProp";
import { post } from "../apiClient";

/**
 * Logs in a user with the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} The response from the API.
 */
async function login(username: string, password: String) {
  return await post("auth/signin", { username, password }, false);
}

async function register(user: UserProp) {
  return await post("auth/signup", user, false);
}

export { login, register };
