// api/comment.api.js

const BASE_URL = "http://localhost:3000";

const getToken = () => {
  return localStorage.getItem("token");
};

// GET COMMENTS BY ITEM
export const getCommentsByItem = async (
  itemId,
  {
    page = 1,
    limit = 5,
    comment = "",
    sortBy = "",
    order = "",
  } = {}
) => {

  const query = new URLSearchParams({
    page,
    limit,
    comment,
    sortBy,
    order,
  });

  const response = await fetch(
    `${BASE_URL}/items/${itemId}/comments?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};


export const createComment = async (
  itemId,
  data
) => {

  const formData = new FormData();

  formData.append("comment", data.comment);

  const response = await fetch(
    `${BASE_URL}/items/${itemId}/comments`,
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

export const updateComment = async (
  id,
  data
) => {

  const formData = new FormData();

  formData.append("comment", data.comment);

  const response = await fetch(
    `${BASE_URL}/comments/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    }
  );

  return response.json();
};


export const deleteComment = async (id) => {

  const response = await fetch(
    `${BASE_URL}/comments/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};


export const restoreComment = async (id) => {

  const response = await fetch(
    `${BASE_URL}/comments/restore/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};