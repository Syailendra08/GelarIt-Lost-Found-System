const BASE_URL = "http://localhost:3000/categories";

const getToken = () => {
    return localStorage.getItem("token");
};

const defaultHeaders = (isJson = true) => ({

    ...(isJson && {
        "Content-Type": "application/json",
    }),

    Authorization: `Bearer ${getToken()}`
});


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
      headers: defaultHeaders()
    }
  );

  return response.json();
};

export const getCategoryById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      headers: defaultHeaders()
    }
  );

  return response.json();
};

export const createCategory = async (data) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: defaultHeaders(true),
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
    headers: defaultHeaders(true),
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
    headers: defaultHeaders()
  });

  return response.json();
};

export const restoreCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/trash/restore/${id}`, {
    method: "PATCH",
    headers: defaultHeaders()
  });

  return response.json();
};

export const getTrashCategories = async () => {
  const response = await fetch(`${BASE_URL}/trash`, {
    headers: defaultHeaders()
  });

  return response.json();
};

export const forceDeleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/trash/force-delete/${id}`, {
    method: "DELETE",
    headers: defaultHeaders()
  });

  return response.json();
};

export const exportCategories = async () => {
  const response = await fetch(`${BASE_URL}/export`, {
    headers: defaultHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed export categories");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "daftar-categories.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

export const getCategoryStats = async () => {
  const response = await fetch(`${BASE_URL}/stats`, {
    headers: defaultHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed stats categories");
  }

  return response.json();
};