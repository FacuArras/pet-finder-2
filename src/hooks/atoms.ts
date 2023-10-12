import { atom, selector } from "recoil"

export const token = atom({
    key: "token",
    default: localStorage.getItem("pet-finder") ? JSON.parse(localStorage.getItem("pet-finder")).token : null
});

export const userProfile = selector({
    key: "userProfile",
    get: async ({ get }) => {

        const userToken = get(token);

        if (userToken) {
            console.log("Estas logueado");
            const response = await fetch("https://petfinderapp.onrender.com/auth/me", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + userToken
                },
            });

            const data = await response.json();

            return data;
        } else {
            console.log("Non estas logueado");
        };
    }
});