export default function createUser(userFullName: string, userEmail: string, userPhoneNumber: number, userPassword: string, userProfilePicture: string) {
    fetch("https://petfinderapp.onrender.com/auth", {
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
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        return data;
    });
};