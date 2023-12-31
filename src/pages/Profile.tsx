import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userProfile } from "../api/atoms";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { token } from "../api/atoms";
import updateUser from "../api/user/updateUser";
import scrollToTop from "../hook/scrollToTop";
import Button from "../components/Button";
import Dropzone from "../components/DropzoneComponent";
import Loader from "../components/Loader";

type Inputs = {
  name: string;
  email: string;
  phoneNumber: number;
};

export default function Profile() {
  scrollToTop();
  const navigate = useNavigate();
  const userProfileInfo = useRecoilValue(userProfile);
  const [userToken, setUserToken] = useRecoilState(token);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pictureURL, setPictureURL] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = {
      name: data.name ? data.name : userProfileInfo.full_name,
      email: data.email ? data.email : userProfileInfo.email,
      phoneNumber: data.email ? data.phoneNumber : userProfileInfo.phone_number,
    };

    try {
      setIsLoading(true);
      const response: any = await updateUser(
        userToken,
        user.name,
        user.email,
        user.phoneNumber,
        pictureURL
      );

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handlePictureURL = (url) => {
    setPictureURL(url);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-8 px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-center mt-6 mb-10 text-tertiaryColor">
        Mi perfil
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-[285px] mx-auto"
      >
        <Dropzone
          bg={userProfileInfo.profile_picture_URL}
          isActive={isReadOnly ? false : true}
          pictureURL={handlePictureURL}
        />

        <label>
          <p className="font-medium text-lg">Nombre</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full placeholder-black"
            type="text"
            {...register("name")}
            id="registerName"
            autoComplete="name"
            placeholder={userProfileInfo ? userProfileInfo.full_name : ""}
            readOnly={isReadOnly}
          />
        </label>

        <label>
          <p className="font-medium text-lg">Correo electrónico</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full placeholder-black"
            type="email"
            {...register("email")}
            id="registerEmail"
            autoComplete="email"
            placeholder={userProfileInfo ? userProfileInfo.email : ""}
            readOnly={isReadOnly}
          />
        </label>

        <label>
          <p className="font-medium text-lg">Número de teléfono</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full placeholder-black"
            type="number"
            {...register("phoneNumber")}
            id="registerPhoneNumber"
            autoComplete="tel"
            placeholder={userProfileInfo ? userProfileInfo.phone_number : ""}
            readOnly={isReadOnly}
          />
        </label>

        {isReadOnly ? (
          <Button
            type={"button"}
            color={"bg-primaryColor"}
            margin={"mt-2"}
            onClick={toggleReadOnly}
            small={false}
          >
            Modificar Datos
          </Button>
        ) : (
          <div>
            <Button
              type={"submit"}
              color={"bg-primaryColor"}
              margin={"mt-2"}
              small={false}
            >
              Guardar datos modificados
            </Button>

            <Button
              type={"button"}
              color={"bg-secondaryColor"}
              margin={"mt-5"}
              onClick={toggleReadOnly}
              small={false}
            >
              Cancelar
            </Button>
          </div>
        )}
      </form>
    </main>
  );
}
