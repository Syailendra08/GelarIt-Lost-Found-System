import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getToken = () => {
  return localStorage.getItem("token");
};

const defaultHeaders = (isJson = true) => ({
  ...(isJson && {
    "Content-Type": "application/json",
  }),

  Authorization: `Bearer ${getToken()}`,
});

export const createRequest = async (
  itemId,
  data
) => {

  return await axios.post(
    `${BASE_URL}/items/${itemId}/requests`,
    data,
    {
      headers: defaultHeaders(),
    }
  );

};

export const getAllRequests = async ({
  page = 1,
  limit = 10,
  sortBy = "",
  order = "",
} = {}) => {

  return await axios.get(
    `${BASE_URL}/requests`,
    {
      params: {
        page,
        limit,
        sortBy,
        order,
      },

      headers: defaultHeaders(false),
    }
  );

};

export const getRequestById = async (id) => {

  return await axios.get(
    `${BASE_URL}/requests/${id}`,
    {
      headers: defaultHeaders(false),
    }
  );

};

export const getRequestsByItem = async (itemId) => {

  return await axios.get(
    `${BASE_URL}/items/${itemId}/requests`,
    {
      headers: defaultHeaders(false),
    }
  );

};

export const approveRequest = async (id) => {

  return await axios.put(
    `${BASE_URL}/requests/${id}/approve`,
    {},
    {
      headers: defaultHeaders(),
    }
  );

};

export const rejectRequest = async (id) => {

  return await axios.patch(
    `${BASE_URL}/requests/${id}/reject`,
    {},
    {
      headers: defaultHeaders(),
    }
  );

};

export const markAsTaken = async (id) => {

  return await axios.patch(
    `${BASE_URL}/requests/${id}/taken`,
    {},
    {
      headers: defaultHeaders(),
    }
  );

};

export const deleteRequest = async (id) => {

  return await axios.delete(
    `${BASE_URL}/requests/${id}`,
    {
      headers: defaultHeaders(false),
    }
  );

};

export const getTrashRequests = async () => {

  return await axios.get(
    `${BASE_URL}/requests/trash`,
    {
      headers: defaultHeaders(false),
    }
  );

};

export const forceDeleteRequest = async (id) => {

  return await axios.delete(
    `${BASE_URL}/requests/trash/force-delete/${id}`,
    {
      headers: defaultHeaders(false),
    }
  );
  };

  export const restoreRequest = async (id) => {
  return await axios.patch(
    `${BASE_URL}/requests/trash/restore/${id}`,
    {},
    {
      headers: defaultHeaders(),
    }
  );
};

export const getRequestStats = async () => {
    const response = await fetch(`${BASE_URL}/requests/stats`, {
        method: "GET",
        headers: defaultHeaders(false),
    });
     if (!response.ok) {
        throw new Error("Failed stats requests");
    }
}
