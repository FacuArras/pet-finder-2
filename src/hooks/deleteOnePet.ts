export default async function deleteOnePet(token, petId: number) {
    const response = await fetch("https://petfinderapp.onrender.com/pets/" + petId, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    });

    const data = await response.json();

    return data;
}