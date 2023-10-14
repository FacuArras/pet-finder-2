import Button from "../components/Button";
import Dropzone from "../components/DropzoneComponent";
import MapboxComponent from "../components/MapBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { token } from "../api/atoms";
import createPet from "../api/pet/createPet";
import Loader from "../components/Loader";
import scrollToTop from "../hook/scrollToTop";

type Inputs = {
  name: string;
  description: string;
};

export default function PublishPet() {
  scrollToTop();
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useState();
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useRecoilState(token);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let petLocation: { lat?: number; lng?: number; name?: string } = location;

    try {
      setIsLoading(true);
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

      if (response.ok) {
        navigate("/published-pets");
      } else {
        setFormError(
          "Ha ocurrido un error con el registro del reporte, por favor chequeá que hayas completado todos los campos"
        );
        setIsLoading(false);
      }
    } catch (error) {
      setFormError(
        "Ha ocurrido un error con el registro del reporte, por favor chequeá que hayas completado todos los campos"
      );
      setIsLoading(false);
    }
  };

  const handleOnSetLocation = (data) => {
    setLocation(data);
  };

  const handlePictureURL = (url) => {
    setPictureURL(url);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-8 px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-center mt-6 mb-5 text-tertiaryColor">
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
            {...register("name", { required: "El nombre es obligatorio" })}
            id="petName"
            autoComplete="off"
          />
          {errors.name && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.name.message}
            </p>
          )}
        </label>

        <p className="font-medium text-lg">Foto de tu mascota</p>
        <Dropzone pictureURL={handlePictureURL} isActive={true} />

        <p className="font-medium text-lg">
          Marcá en el mapa el útlimo lugar en donde la viste (Tenés que poner la
          ubicación en el buscador y después, tocando el mapa, poner un marcador
          en un lugar más preciso)
        </p>
        <MapboxComponent onSetLocation={handleOnSetLocation} />

        <label className="mt-4">
          <p className="font-medium text-lg">
            Información útil para poder encontrarla
          </p>
          <textarea
            className="p-1 text-lg rounded-sm shadow-md w-full resize-none"
            id="petDescription"
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
            cols={30}
            rows={5}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.description.message}
            </p>
          )}
        </label>

        {formError && (
          <p className="text-red-500 font-semibold text-sm">{formError}</p>
        )}

        <Button
          type={"submit"}
          color={"bg-primaryColor"}
          margin={"mt-2"}
          small={false}
        >
          Enviar información
        </Button>
      </form>
    </main>
  );
}
