const BASE_URL = "http://localhost:3000/locations";

const getToken = () => {
  return localStorage.getItem("token");
};

const defaultHeaders = (isJson = true) => ({
  ...(isJson && {
    "Content-Type": "application/json",
  }),

  Authorization: `Bearer ${getToken()}`,
});

export const getLocations = async ({
  page = 1,
  limit = 5,
  name = "",
  sortBy = "",
  order = "",
} = {}) => {
  const query = new URLSearchParams({
    page,
    limit,
    name,
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

export const getLocationById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "GET",
      headers: defaultHeaders(false),
    }
  );

  return response.json();
};

export const createLocation = async (data) => {
  const response = await fetch(BASE_URL, {
    method: "POST",

    headers: defaultHeaders(),

    body: JSON.stringify({
      name: data.name,
      description: data.description,
    }),
  });

  return response.json();
};

export const updateLocation = async (id, data) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",

    headers: defaultHeaders(),

    body: JSON.stringify({
      name: data.name,
      description: data.description,
    }),
  });

  return response.json();
};

export const deleteLocation = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",

    headers: defaultHeaders(false),
  });

  return response.json();
};

export const getTrashLocations = async () => {
  const response = await fetch(`${BASE_URL}/trash`, {
    method: "GET",

    headers: defaultHeaders(false),
  });

  return response.json();
};

export const restoreLocation = async (id) => {
  const response = await fetch(
    `${BASE_URL}/trash/restore/${id}`,
    {
      method: "PATCH",

      headers: defaultHeaders(false),
    }
  );

  return response.json();
};

export const forceDeleteLocation = async (id) => {
  const response = await fetch(
    `${BASE_URL}/trash/force-delete/${id}`,
    {
      method: "DELETE",

      headers: defaultHeaders(false),
    }
  );

  return response.json();
};

export const exportLocations = async () => {
  const response = await fetch(`${BASE_URL}/export`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed export locations");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "daftar-locations.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};