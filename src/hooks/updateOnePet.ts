export default async function updateOnePet(token, petId: number, petName: string, petLastLocationLat: number, petLastLocationLng: number, petDescription: string, petState: string, petLastSeen: string, petPicture?: string) {
    const response = await fetch("https://petfinderapp.onrender.com/pets/" + petId, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "full_name": petName,
            "pet_picture_URL": petPicture,
            "last_location_lat": petLastLocationLat,
            "last_location_lng": petLastLocationLng,
            "description": petDescription,
            "state": petState,
            "last_seen": petLastSeen
        })
    });

    const data = await response.json();

    return data;
}