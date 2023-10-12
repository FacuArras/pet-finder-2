import Button from "../components/Button";
import Dropzone from "../components/DropzoneComponent";
import Map from "../components/Map";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { token } from "../hooks/atoms";
import createPet from "../hooks/createPet";

type Inputs = {
  name: string;
  description: string;
};

export default function PublishPet() {
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useState();
  const [location, setLocation] = useState();
  const [userToken, setUserToken] = useRecoilState(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let petLocation: { lat?: number; lng?: number; name?: string } = location;

    try {
      const response: any = await createPet(
        userToken,
        data.name,
        pictureURL,
        petLocation.lat,
        petLocation.lng,
        data.description,
        "lost",
        petLocation.name
      );

      navigate("/published-pets");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSetLocation = (data) => {
    setLocation(data);
  };

  const handlePictureURL = (url) => {
    setPictureURL(url);
  };

  return (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-8 px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-center mt-6 mb-5 text-[#1a2631]">
        Reportar mascota perdida
      </h1>
      <h2 className="font-medium text-xl text-center mb-10">
        Ingresá los siguientes datos para realizar el reporte de tu mascota
        perdida
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-[285px] mx-auto"
      >
        <label>
          <p className="font-medium text-lg">Nombre</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full"
            type="text"
            {...register("name")}
            autoComplete="off"
          />
        </label>

        <p className="font-medium text-lg">Foto de tu mascota</p>
        <Dropzone pictureURL={handlePictureURL} isActive={true} />

        <p className="font-medium text-lg">
          Marcá en el mapa el útlimo lugar en donde la viste (Tenés que poner la
          ubicación en el buscador y después, tocando el mapa, poner un marcador
          en un lugar más preciso)
        </p>
        <Map onSetLocation={handleOnSetLocation} />

        <label className="mt-4">
          <p className="font-medium text-lg">
            Información útil para poder encontrarla
          </p>
          <textarea
            className="p-1 text-lg rounded-sm shadow-md w-full resize-none"
            {...register("description")}
            cols={30}
            rows={5}
          ></textarea>
        </label>

        <Button
          type={"submit"}
          color={"bg-[#1a82b9]"}
          margin={"mt-2"}
          small={false}
        >
          Enviar información
        </Button>
      </form>
    </main>
  );
}
