const BASE_URL = "http://localhost:3000/notifications";

const getToken = () => {
    return localStorage.getItem("token");
};

const defaultHeaders = (isJson = true) => ({

    ...(isJson && {
        "Content-Type": "application/json",
    }),

    Authorization: `Bearer ${getToken()}`
});

export const getNotifications = async () => {

    const response = await fetch(
        BASE_URL,
        {
            method: "GET",
            headers: defaultHeaders(false)
        }
    );

    return response.json();

};

export const getNotificationById = async (id) => {

    const response = await fetch(
        `${BASE_URL}/${id}`,
        {
            method: "GET",
            headers: defaultHeaders(false)
        }
    );

    return response.json();

};

export const readNotification = async (id) => {

    const response = await fetch(
        `${BASE_URL}/${id}/read`,
        {
            method: "PUT",
            headers: defaultHeaders(false)
        }
    );

    return response.json();

};

export const readAllNotifications = async () => {

    const response = await fetch(
        `${BASE_URL}/read-all`,
        {
            method: "PUT",
            headers: defaultHeaders(false)
        }
    );

    return response.json();

};