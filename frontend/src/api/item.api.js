const BASE_URL = "http://localhost:3000/items";


const getToken = () => {
    return localStorage.getItem("token");
};

export const getItems = async ({
    page = 1,
    limit = 5,
    name = "",
    sortBy = "",
    order = "",
        category_id = "",
    location_id = ""
} = {}) => {

    const query = new URLSearchParams({
        page,
        limit,
        name,
        sortBy,
        order,
        category_id,
        location_id
    });
    const response = await fetch(
        `${BASE_URL}?${query.toString()}`
    );
    return response.json();
};

export const getItemsByUser = async (
    userId,
    {
        page = 1,
        limit = "",
        name = "",
        sortBy = "",
        order = ""
    } = {}
) => {


    const token = getToken();
    const query = new URLSearchParams({
        page,
        limit,
        name,
        sortBy,
        order
    });

    const response = await fetch(
        `${BASE_URL}/users/${userId}?${query.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.json();

    
};

export const createItem = async (data) => {

    const token = getToken();
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
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    return response.json();
};

export const updateItem = async (id, data) => {

    const token = getToken();
    const formData = new FormData();

    if (data.categories_id) {formData.append("categories_id", data.categories_id);}
    if (data.locations_id) {formData.append("locations_id", data.locations_id);}
    if (data.receiver_id) {formData.append("receiver_id", data.receiver_id);}
    if (data.name) {formData.append("name", data.name);}
    if (data.description) {formData.append("description", data.description);}
    if (data.color) {formData.append("color", data.color);}
    if (data.date) {formData.append("date", data.date);}
    if (data.status) {formData.append("status", data.status);}
    if (data.image) {formData.append("image", data.image);}

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    return response.json();
};


export const deleteItem = async (id) => {

    const token = getToken();

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};

export const getItemById = async (id) => {
 const token = getToken();
     const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};