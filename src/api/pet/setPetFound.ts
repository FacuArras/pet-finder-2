export default async function setPetFound(token, petId: number) {
    const response = await fetch("https://petfinderapp.onrender.com/pets/" + petId, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "state": "found"
        })
    });

    const data = await response.json();

    return data;
}