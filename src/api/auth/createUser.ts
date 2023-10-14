export default async function createUser(userFullName: string, userEmail: string, userPhoneNumber: number, userPassword: string, userProfilePicture: string) {
    try {
        const response = await fetch("https://petfinderapp.onrender.com/auth", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userFullName,
                userEmail,
                userPhoneNumber,
                userPassword,
                userProfilePicture
            })
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    };
};