export default async function getPetsNearby(lat: number, lng: number) {
    const response = await fetch("https://petfinderapp.onrender.com/pets/nearby?lat=" + lat + "&lng=" + lng, {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    });

    const data = await response.json();

    return data;
}