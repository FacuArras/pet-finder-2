export default async function getOnePet(petId: number) {
    const response = await fetch("https://petfinderapp.onrender.com/pets/" + petId, {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    });

    const data = await response.json();

    return data;
}