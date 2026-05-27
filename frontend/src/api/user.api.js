const BASE_URL = "http://localhost:3000/users";

const getToken = () => {
  return localStorage.getItem("token");
};

const defaultHeaders = (isJson = true) => ({
  ...(isJson && {
    "Content-Type": "application/json",
  }),

  Authorization: `Bearer ${getToken()}`,
});


export const getUsers = async ({
  page = 1,
  limit = 5,
  name = "",
  email = "",
  sortBy = "",
  order = "",
} = {}) => {

  const query = new URLSearchParams({
    page,
    limit,
    name,
    email,
    sortBy,
    order,
  });

  const response = await fetch(
    `${BASE_URL}?${query.toString()}`,
    {
      method: "GET",
      headers: defaultHeaders(false),
    }
  );

  return response.json();
};


export const getUserById = async (id) => {

  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "GET",
      headers: defaultHeaders(false),
    }
  );

  return response.json();
};


export const createUser = async (data) => {

  const response = await fetch(BASE_URL, {
    method: "POST",

    headers: defaultHeaders(),

    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    }),
  });

  return response.json();
};



export const updateUser = async (id, data) => {

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",

    headers: defaultHeaders(),

    body: JSON.stringify({
      name: data.name,
      email: data.email,
      role: data.role,
    }),
  });

  return response.json();
};



export const deleteUser = async (id) => {

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",

    headers: defaultHeaders(false),
  });

  return response.json();
};


export const getTrashUsers = async () => {

  const response = await fetch(`${BASE_URL}/trash`, {
    method: "GET",

    headers: defaultHeaders(false),
  });

  return response.json();
};


export const restoreUser = async (id) => {

  const response = await fetch(
    `${BASE_URL}/trash/restore/${id}`,
    {
      method: "PATCH",

      headers: defaultHeaders(false),
    }
  );

  return response.json();
};


export const forceDeleteUser = async (id) => {

  const response = await fetch(
    `${BASE_URL}/trash/force-delete/${id}`,
    {
      method: "DELETE",

      headers: defaultHeaders(false),
    }
  );

  return response.json();
};


export const exportUsers = async () => {
  const response = await fetch(
    `${BASE_URL}/export`,
    {
      method: "GET",

      headers: defaultHeaders(false),
    }
  );

  if (!response.ok) {
    throw new Error("Failed export users");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "daftar-users.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};