export const API = {
    user_login: async (body) => {
        let arr = await fetch("/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err));
        console.log(arr);
        return arr;
    },
    record_create: () => {
        fetch("/api/create")
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    },
    record_read: () => {},
    record_update: () => {},
    record_delete: () => {},
};
