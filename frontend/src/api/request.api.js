import axios from "axios";

const BASE_URL =
  "http://localhost:3000";

const token =
  localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};


export const createRequest = async (
  itemId,
  data
) => {

  return await axios.post(
    `${BASE_URL}/items/${itemId}/requests`,
    data,
    {
      headers,
    }
  );

};

export const getAllRequests =
  async ({
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

        headers,
      }
    );

  };


export const getRequestById =
  async (id) => {

    return await axios.get(
      `${BASE_URL}/requests/${id}`,
      {
        headers,
      }
    );

  };


export const getRequestsByItem =
  async (itemId) => {

    return await axios.get(
      `${BASE_URL}/items/${itemId}/requests`,
      {
        headers,
      }
    );

  };


export const approveRequest =
  async (id) => {

    return await axios.put(
      `${BASE_URL}/requests/${id}/approve`,
      {},
      {
        headers,
      }
    );

  };


export const rejectRequest =
  async (id) => {

    return await axios.patch(
      `${BASE_URL}/requests/${id}/reject`,
      {},
      {
        headers,
      }
    );

  };

export const markAsTaken =
  async (id) => {

    return await axios.patch(
      `${BASE_URL}/requests/${id}/taken`,
      {},
      {
        headers,
      }
    );

  };

export const deleteRequest =
  async (id) => {

    return await axios.delete(
      `${BASE_URL}/requests/${id}`,
      {
        headers,
      }
    );

  };