export default async function logIn(userEmail: string, userPassword: string, cb) {
    const response = await fetch("https://petfinderapp.onrender.com/auth/token", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            userEmail,
            userPassword,
        }),
    });

    if (response.ok) {
        const data = await response.json();

        console.log(data);
        localStorage.setItem("pet-finder", JSON.stringify({ "token": data }));
        cb(data);
    } else {
        throw new Error("Error al iniciar sesión");
    };
};