import { PixelCrop } from "react-image-crop";

/***
 * Save image as a base64Image string
 * @completedCrop
 * @profilePicture as a string
 */
const OnSave = ({
  completedCrop,
  savePicture,
}: {
  completedCrop: PixelCrop;
  savePicture: string;
}) => {
  return new Promise<{ status: number; base64Image: string }>((resolve) => {
    const image = new Image();
    image.src = savePicture;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY
        );
        const base64Image = canvas.toDataURL("image/png");
        // Save base64Image to your database
        //JUST FOR FUN, THIS IS GOING TO SAVE TO DATABASE
        resolve({ status: 200, base64Image: base64Image });
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(blob);
            }
          },
          "image/png",
          1
        );
      } else {
        resolve({ status: 404, base64Image: "" });
      }
    };

    image.onerror = () => {
      resolve({ status: 404, base64Image: "" });
    };
  });
};

export default OnSave;
