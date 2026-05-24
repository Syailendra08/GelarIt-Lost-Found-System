
const BASE_URL = "http://localhost:3000";

const getToken = () => {
  return localStorage.getItem("token");
};


export const createRequest = async (
  itemId,
  data
) => {

  const formData = new FormData();

  formData.append("message", data.message);

  const response = await fetch(
    `${BASE_URL}/items/${itemId}/requests`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    }
  );

  return response.json();
};


export const getRequestsByItem = async (
  itemId
) => {

  const response = await fetch(
    `${BASE_URL}/items/${itemId}/requests`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};


export const approveRequest = async (id) => {

  const response = await fetch(
    `${BASE_URL}/requests/${id}/approve`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};


export const rejectRequest = async (id) => {

  const response = await fetch(
    `${BASE_URL}/requests/${id}/reject`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};


export const deleteRequest = async (id) => {

  const response = await fetch(
    `${BASE_URL}/requests/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};