import axios from 'axios';
import useToastHook from "../hooks/ToastMessage";
const { showSuccessToast, showErrorToast } = useToastHook();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://backend.tubetailor.ai/api/';

export async function getRequestApi(url, parameter) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not logged in. Unable to fetch data.');
  }

  try {
    const response = await axios.get(url, {
      params: parameter,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in API request:", error.response.data.message);
    showErrorToast(error.response.data.message); // Show error message in toast
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export async function postRequest(url, parameter) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User is not logged in. Unable to fetch data.');
  }

  try {
    const response = await axios.post(url, parameter, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in API request:", error.response.data.message);
    showErrorToast(error.response.data.message); // Show error message in toast
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export async function putRequest(url, parameter) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User is not logged in. Unable to fetch data.');
  }

  try {
    const response = await axios.put(url, parameter, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in API request:", error.response.data.message);
    showErrorToast(error.response.data.message); // Show error message in toast
    throw error; // Re-throw the error to propagate it further if needed
  }
}
