import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  id;
  imageURL;
  name;
  place;
  page;
  found?;
  onDeletePet?;
  onReport?;
};

type Inputs = {
  name: string;
  phoneNumber: number;
  lastSeen: string;
};

export default function Card({
  id,
  imageURL,
  name,
  place,
  page,
  found,
  onDeletePet,
  onReport,
}: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOnClickReport = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleClickOnEdit = () => {
    navigate("/published-pets/" + id);
  };

  const onReportSubmit: SubmitHandler<Inputs> = (data) => {
    onReport({ data, id, name });
  };

  return (
    <div className="bg-[#1a2631] relative mx-auto my-8 w-[90%] max-w-[310px] p-4 rounded-2xl shadow-xl">
      <div className="h-[165px] w-full rounded-xl overflow-hidden">
        <img
          src={imageURL}
          alt="lostPetPicture"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex justify-between items-center gap-2 pt-3">
        <div>
          <p className="font-bold text-2xl text-white text-center">{name}</p>
          <p className="font-medium text-xs text-white mt-2">{place}</p>
        </div>

        {page === "lost" ? (
          <Button
            onClick={handleOnClickReport}
            color={"bg-[#1a82b9]"}
            margin={""}
            type={"button"}
            small={true}
          >
            Reportar
            <i className="fa-solid fa-bell ml-2 inline"></i>
          </Button>
        ) : (
          <Button
            onClick={handleClickOnEdit}
            color={"bg-[#1a82b9]"}
            margin={""}
            type={"button"}
            small={true}
          >
            Editar
            <i className="fa-solid fa-pen ml-2 inline"></i>
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div
          style={{ boxShadow: " 0 0 20px 13px #00000080" }}
          className="fixed right-[5%] top-28 bg-[#1a2631] max-w-[400px] w-[90%] rounded-2xl py-6 px-4 flex flex-col z-20 items-center"
        >
          <button
            type="button"
            className="ml-[90%]"
            onClick={handleOnClickReport}
          >
            <i className="fa-solid fa-xmark text-white text-3xl"></i>
          </button>
          <h2 className="text-white text-center text-2xl mt-4 font-bold">
            Reportar información de {name}
          </h2>
          <form
            onSubmit={handleSubmit(onReportSubmit)}
            className="text-white mt-5 flex flex-col gap-4"
          >
            <label>
              <p className="text-md">Nombre</p>
              <input
                className="p-1 text-lg rounded-sm shadow-md w-full text-black"
                type="text"
                {...register("name", { required: true })}
                id="reportName"
                autoComplete="off"
                required
              />
            </label>
            <label>
              <p className="text-md">Teléfono (opcional)</p>
              <input
                className="p-1 text-lg rounded-sm shadow-md w-full text-black"
                type="number"
                {...register("phoneNumber")}
                id="reportPhoneNumber"
                autoComplete="tel"
              />
            </label>
            <label>
              <p className="text-md">¿Dónde lo viste?</p>
              <textarea
                className="p-1 text-lg rounded-sm shadow-md w-full resize-none text-black"
                {...register("lastSeen", { required: true })}
                id="reportLastSeen"
                required
                cols={30}
                rows={5}
              ></textarea>
            </label>

            <Button
              color={"bg-[#1a82b9]"}
              margin={""}
              type={"submit"}
              small={false}
            >
              Enviar información
            </Button>
          </form>
        </div>
      ) : null}

      {found === "found" ? (
        <div className="p-4 absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full glassEffect">
          <h2 className="font-bold text-black text-2xl text-center">
            ¡Mascota encontrada!
          </h2>

          <Button
            color={"bg-[#12517e]"}
            margin={"mt-6"}
            type={"submit"}
            small={false}
            onClick={onDeletePet}
          >
            Eliminar reporte
          </Button>
        </div>
      ) : null}
    </div>
  );
}
