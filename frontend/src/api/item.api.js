const BASE_URL = "http://localhost:3000/items";


const getToken = () => {
    return localStorage.getItem("token");
};

export const getItems = async ({
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
        `${BASE_URL}?${query.toString()}`
    );
    return response.json();
};

export const getItemsByUser = async (
    userId,
    {
        page = 1,
        limit = 5,
        name = "",
        sortBy = "",
        order = ""
    } = {}
) => {


    const token = localStorage.getItem("token");
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