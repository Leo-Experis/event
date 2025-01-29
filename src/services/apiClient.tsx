/**
 * This module provides functions to interact with the backend API.
 * It includes methods for login, and generic HTTP methods (GET, POST, PUT).
 *
 * @module apiClient
 */

import { API_URL } from "./constants";

/**
 * Sends a POST request to the specified endpoint with the provided data.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Boolean} [auth=true] - Whether to include the Authorization header.
 * @returns {Promise<any>} The response from the API.
 */
async function post(endpoint: string, data: Object, auth: Boolean = true) {
  return await request("POST", endpoint, data, auth);
}

/**
 * Sends a GET request to the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Boolean} [auth=true] - Whether to include the Authorization header.
 * @returns {Promise<any>} The response from the API.
 */
async function get(endpoint: string, auth: Boolean = true) {
  return await request("GET", endpoint, auth);
}

/**
 * Sends a PUT request to the specified endpoint with the provided data.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Boolean} [auth=true] - Whether to include the Authorization header.
 * @returns {Promise<any>} The response from the API.
 */
async function put(endpoint: string, data: Object, auth: Boolean = true) {
  return await request("PUT", endpoint, data, auth);
}

/**
 * Sends an HTTP request to the specified endpoint with the provided method and data.
 *
 * @param {string} method - The HTTP method to use (e.g., "GET", "POST", "PUT").
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Object} data - The data to send in the request body (for non-GET requests).
 * @param {Boolean} [auth=true] - Whether to include the Authorization header.
 * @returns {Promise<any>} The response from the API.
 */
async function request(
  method: string,
  endpoint: string,
  data: Object,
  auth: Boolean = true
) {
  const opts: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    } as Record<string, string>,
    method,
  };

  if (method.toUpperCase() !== "GET") {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    (opts.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
}

async function putBlob(endpoint: string, file: Blob, auth: Boolean = true) {
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  return await requestToCloudStorage("PUT", endpoint, file, auth);
}

async function requestToCloudStorage(
  method: string,
  endpoint: string,
  file: Blob,
  auth: Boolean = true
) {
  const opts: RequestInit = {
    headers: {},
    method,
  };

  if (method.toUpperCase() !== "GET") {
    const formData = new FormData();
    formData.append("file", file);
    opts.body = formData;
  }

  if (auth) {
    (opts.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
}

export { get, post, put, putBlob };
