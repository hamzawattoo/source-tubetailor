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
    if (error.response.status === 401) {
          localStorage.removeItem("token");
    localStorage.removeItem("loglevel");
      window.location.href='/'
    }

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
    if (error.response.status === 401) {
          localStorage.removeItem("token");
    localStorage.removeItem("loglevel");
      window.location.href='/'
    }
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
    if (error.response.status === 401) {
          localStorage.removeItem("token");
    localStorage.removeItem("loglevel");
      window.location.href='/'
    }
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export async function getRequestApiWithoutAuth(url, parameter) {
  try {
    const response = await axios.get(url, {
      params: parameter,
    });
    return response.data;
  } catch (error) {
    console.error("Error in API request:", error.response.data.message);
    showErrorToast(error.response.data.message); // Show error message in toast
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export async function getUserDetail() {
  const token = localStorage.getItem('token');

  if (token) {
    let user = await getRequestApi('profile');
    return user
  }
  return false
}


export async function logout() {
  try {
    const marketingResponse = await postRequest("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("loglevel");
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('user');
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    localStorage.removeItem("loglevel");
    localStorage.removeItem('isSubscribed');
    console.error("Error in YouTube marketing:", error);
    showErrorToast(error.response?.data?.message || "An error occurred during YouTube marketing");
  }
}
