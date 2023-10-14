export default async function createReport(petId: number, userFullName: string, message: string, userEmail: string, petName: string, userPhoneNumber?: number) {
    const response = await fetch("https://petfinderapp.onrender.com/reports/" + petId, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            userFullName,
            message,
            userPhoneNumber,
            userEmail,
            petName
        })
    });

    const data = await response.json();

    return data;
}