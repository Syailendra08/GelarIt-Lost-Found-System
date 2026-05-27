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

// ======================
// GET ALL LOCATIONS
// ======================

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

// ======================
// GET LOCATION BY ID
// ======================

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

// ======================
// CREATE LOCATION
// ======================

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

// ======================
// UPDATE LOCATION
// ======================

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

// ======================
// SOFT DELETE LOCATION
// ======================

export const deleteLocation = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",

    headers: defaultHeaders(false),
  });

  return response.json();
};

// ======================
// GET TRASH LOCATIONS
// ======================

export const getTrashLocations = async () => {
  const response = await fetch(`${BASE_URL}/trash`, {
    method: "GET",

    headers: defaultHeaders(false),
  });

  return response.json();
};

// ======================
// RESTORE LOCATION
// ======================

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
  const response = await fetch(
    `${BASE_URL}/export`,
    {
      method: "GET",

      headers: defaultHeaders(false),
    }
  );

  return response.blob();
};