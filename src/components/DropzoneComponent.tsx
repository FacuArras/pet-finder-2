import Dropzone from "dropzone";
import { useEffect } from "react";

type Props = {
  isActive: boolean;
  pictureURL: (any) => any;
  bg?: string;
};

export default function DropzoneComponent({ isActive, pictureURL, bg }: Props) {
  useEffect(() => {
    if (isActive) {
      const myDropzone = new Dropzone("#profilePicture", {
        url: "/falsa",
        autoProcessQueue: false,
        maxThumbnailFilesize: 2,
        maxFiles: 1,
        thumbnailWidth: 260,
        thumbnailHeight: 260,
      });

      myDropzone.on("thumbnail", function (file) {
        pictureURL(file.dataURL);
      });

      return () => {
        myDropzone.destroy();
      };
    }
  }, [isActive]);

  return (
    <div
      id="profilePicture"
      style={{ backgroundImage: `url(${bg})` }}
      className={`${
        bg ? "" : "bg-[#8080802c]"
      } bg-cover bg-center rounded-full w-[250px] h-[250px] flex justify-center items-center mx-auto`}
    ></div>
  );
}
