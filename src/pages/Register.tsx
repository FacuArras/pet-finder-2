import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Dropzone from "../components/DropzoneComponent";
import { useEffect, useState } from "react";
import createUser from "../hooks/createUser";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await createUser(
        data.name,
        data.email,
        data.phoneNumber,
        data.password.toString(),
        pictureURL
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePictureURL = (url) => {
    setPictureURL(url);
  };

  return (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-8 px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-center mt-6 text-[#1a2631]">
        Registrate
      </h1>
      <h2 className="font-medium text-xl text-center mt-2 mb-8">
        Ingresá los siguientes datos para registrarte
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-[285px] mx-auto"
      >
        <p className="font-medium text-lg">Foto de perfil (opcional)</p>
        <Dropzone isActive={true} pictureURL={handlePictureURL} />

        <label>
          <p className="font-medium text-lg">Nombre</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="text"
            {...register("name", { required: true })}
            id="registerName"
            autoComplete="name"
            required
          />
        </label>

        <label>
          <p className="font-medium text-lg">Correo electrónico</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="email"
            {...register("email", { required: true })}
            id="registerEmail"
            autoComplete="email"
            required
          />
        </label>

        <label>
          <p className="font-medium text-lg">Número de teléfono</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="number"
            {...register("phoneNumber", { required: true })}
            id="registerPhoneNumber"
            autoComplete="tel"
            required
          />
        </label>

        <label>
          <p className="font-medium text-lg">Contraseña</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="password"
            {...register("password", { required: true })}
            id="registerPassword"
            autoComplete="off"
            required
          />
        </label>

        <p className="font-medium text-md">
          Ya tenés cuenta?
          <Link to={"/login"} className="text-[#1a82b9] underline ml-2">
            Iniciá sesión
          </Link>
        </p>

        <Button
          type={"submit"}
          color={"bg-[#1a82b9]"}
          margin={"mt-2"}
          small={false}
        >
          Registrate
        </Button>
      </form>
    </main>
  );
}
