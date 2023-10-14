export default async function (token) {
    const response = await fetch("https://petfinderapp.onrender.com/pets/me", {
        method: "get",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    });

    const data = await response.json();

    return data;
}