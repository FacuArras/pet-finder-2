import Button from "../components/Button";
import Dropzone from "../components/DropzoneComponent";
import createUser from "../api/auth/createUser";
import scrollToTop from "../hook/scrollToTop";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
};

export default function Register() {
  scrollToTop();
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await createUser(
        data.name,
        data.email,
        data.phoneNumber,
        data.password.toString(),
        pictureURL
      );
      response[0].userCreated ? navigate("/login") : setIsLoading(false);
      setFormError(
        'El usuario con el email "' +
          response[0].user.email +
          '" ya está registrado'
      );
    } catch (error) {
      setFormError(
        "Ha ocurrido un error con el registro, por favor intentalo de nuevo"
      );
      setIsLoading(false);
    }
  };

  const handlePictureURL = (url) => {
    setPictureURL(url);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-8 px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-center mt-6 text-tertiaryColor">
        Registrate
      </h1>
      <h2 className="font-medium text-xl text-center mt-2 mb-8">
        Ingresá los siguientes datos para registrarte
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-[285px] mx-auto"
      >
        <p className="font-medium text-lg">
          Foto de perfil <span className="text-sm">(opcional)</span>
        </p>
        <Dropzone isActive={true} pictureURL={handlePictureURL} />

        <label>
          <p className="font-medium text-lg">Nombre</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            id="registerName"
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.name.message}
            </p>
          )}
        </label>

        <label>
          <p className="font-medium text-lg">Correo electrónico</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="email"
            {...register("email", { required: "El email es obligatorio" })}
            id="registerEmail"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.email.message}
            </p>
          )}
        </label>

        <label>
          <p className="font-medium text-lg">Número de teléfono</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="number"
            {...register("phoneNumber", {
              required: "El número de teléfono es obligatorio",
            })}
            id="registerPhoneNumber"
            autoComplete="tel"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </label>

        <label>
          <p className="font-medium text-lg">Contraseña</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            id="registerPassword"
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.password.message}
            </p>
          )}
        </label>

        {formError && (
          <p className="text-red-500 font-semibold text-sm">{formError}</p>
        )}

        <p className="font-medium text-md">
          Ya tenés cuenta?
          <Link to={"/login"} className="text-primaryColor underline ml-2">
            Iniciá sesión
          </Link>
        </p>

        <Button
          type={"submit"}
          color={"bg-primaryColor"}
          margin={"mt-2"}
          small={false}
        >
          Registrate
        </Button>
      </form>
    </main>
  );
}
