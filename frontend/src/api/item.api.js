const BASE_URL = "http://localhost:3000/items";

const getToken = () => {
    return localStorage.getItem("token");
};

const defaultHeaders = (isJson = true) => ({
    ...(isJson && {
        "Content-Type": "application/json",
    }),
    Authorization: `Bearer ${getToken()}`,
});

export const getItems = async ({
    page = 1,
    limit = 5,
    name = "",
    category_id = "",
    location_id = "",
    sortBy = "",
    order = "",
    status = "",
} = {}) => {
    const query = new URLSearchParams({
        page,
        limit,
        name,
        category_id,
        location_id,
        sortBy,
        order,
        status,
    });

    const response = await fetch(`${BASE_URL}?${query.toString()}`, {
        method: "GET",
        headers: defaultHeaders(false),
    });

    return response.json();
};

export const getItemById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: defaultHeaders(false),
    });

    return response.json();
};

export const getItemsByUser = async (
    userId,
    { page = 1, limit = 5, name = "", sortBy = "", order = "" } = {}
) => {
    const query = new URLSearchParams({
        page,
        limit,
        name,
        sortBy,
        order,
    });

    const response = await fetch(
        `${BASE_URL}/users/${userId}?${query.toString()}`,
        {
            method: "GET",
            headers: defaultHeaders(false),
        }
    );

    return response.json();
};

export const createItem = async (data) => {
    const formData = new FormData();

    formData.append("categories_id", data.categories_id);
    formData.append("locations_id", data.locations_id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("color", data.color);
    formData.append("date", data.date);
    formData.append("status", data.status);

    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: defaultHeaders(false),
        body: formData,
    });

    return response.json();
};

export const updateItem = async (id, data) => {
    const formData = new FormData();
    if (data.categories_id) formData.append("categories_id", data.categories_id);
    if (data.locations_id) formData.append("locations_id", data.locations_id);
    if (data.receiver_id) formData.append("receiver_id", data.receiver_id);
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.color) formData.append("color", data.color);
    if (data.date) formData.append("date", data.date);
    if (data.status) formData.append("status", data.status);

    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: defaultHeaders(false),
        body: formData,
    });

    return response.json();
};

export const deleteItem = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: defaultHeaders(false),
    });

    return response.json();
};

export const getTrashItems = async () => {
    const response = await fetch(`${BASE_URL}/trash`, {
        method: "GET",
        headers: defaultHeaders(false),
    });

    return response.json();
};

export const restoreItem = async (id) => {
    const response = await fetch(`${BASE_URL}/trash/restore/${id}`, {
        method: "PATCH",
        headers: defaultHeaders(false),
    });

    return response.json();
};

export const forceDeleteItem = async (id) => {
    const response = await fetch(`${BASE_URL}/trash/force-delete/${id}`, {
        method: "DELETE",
        headers: defaultHeaders(false),
    });

    return response.json();
};

export const exportItems = async () => {
    const response = await fetch(`${BASE_URL}/export`, {
        method: "GET",
        headers: defaultHeaders(false),
    });

    if (!response.ok) {
        throw new Error("Failed export items");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "daftar-items.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const getItemStats = async () => {
    const response = await fetch(`${BASE_URL}/stats`, {
        method: "GET",
        headers: defaultHeaders(false),
    });
     if (!response.ok) {
        throw new Error("Failed stats items");
    }
}
