const BASE_URL = "http://localhost:3000/categories";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getCategories = async ({
  page = 1,
  limit = 5,
  name = "",
  sortBy = "",
  order = ""
} = {}) => {

  const query = new URLSearchParams({
    page,
    limit,
    name,
    sortBy,
    order
  });

  const response = await fetch(
    `${BASE_URL}?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};

export const getCategoryById = async (id) => {

  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};

export const createCategory = async (data) => {

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description
    })
  });

  return response.json();
};

export const updateCategory = async (id, data) => {

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description
    })
  });

  return response.json();
};

export const deleteCategory = async (id) => {

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.json();
};

export const restoreCategory = async (id) => {

  const response = await fetch(`${BASE_URL}/restore/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.json();
};