import logInImage from "../img/auth-image.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { token } from "../api/atoms";
import { useState } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import logIn from "../api/auth/logIn";
import scrollToTop from "../hook/scrollToTop";

type Inputs = {
  email: string;
  password: string;
};

export default function LogIn() {
  scrollToTop();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(token);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await logIn(data.email, data.password.toString());
      setUserToken(response);
      navigate("/");
    } catch (error) {
      setFormError(true);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-12 px-5 min-h-[80vh] flex flex-col justify-center">
      <img src={logInImage} alt="logInImage" className="block mx-auto" />
      <h1 className="font-bold text-3xl text-center mt-6 text-[#1a2631]">
        Iniciar sesión
      </h1>
      <h2 className="font-medium text-xl text-center mt-2 mb-8">
        Ingresá los siguientes datos para inciar sesión
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-[285px] mx-auto"
      >
        <label>
          <p className="font-medium text-lg">Email</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="email"
            {...register("email", { required: "El email es obligatorio" })}
            id="logInEmail"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.email.message}
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
            id="logInPassword"
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.password.message}
            </p>
          )}
        </label>

        {formError && (
          <p className="text-red-500 font-semibold text-sm">
            El mail y/o la contraseña no son válidos
          </p>
        )}

        <p className="font-medium text-md">
          No tenés cuenta?
          <Link to={"/register"} className="text-[#1a82b9] underline ml-2">
            Registrate
          </Link>
        </p>

        <Button
          type={"submit"}
          color={"bg-[#1a82b9]"}
          margin={"mt-2"}
          small={false}
        >
          Iniciar sesión
        </Button>
      </form>
    </main>
  );
}
