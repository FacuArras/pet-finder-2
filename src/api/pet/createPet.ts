export default async function (token, petFullName: string, petPicture: string, petLastLocationLat: number, petLastLocationLng: number, petDescription: string, petState: string, petLastSeen: string) {
    const response = await fetch("https://petfinderapp.onrender.com/pets", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            petFullName,
            petPicture,
            petLastLocationLat,
            petLastLocationLng,
            petDescription,
            petState,
            petLastSeen
        })
    });

    const data = await response.json()

    return data;
}