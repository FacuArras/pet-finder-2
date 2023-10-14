export default async function updateUser(token, userFullName: string, userEmail: string, userPhoneNumber: number, userProfilePicture?: string) {
    const response = await fetch("https://petfinderapp.onrender.com/users/me", {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "full_name": userFullName,
            "email": userEmail,
            "phone_number": userPhoneNumber,
            "profile_picture_URL": userProfilePicture
        })
    });

    const data = await response.json();

    return data;
}