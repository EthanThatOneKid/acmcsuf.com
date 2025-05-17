import { default as cropperjs } from "cropperjs";

/**
 * Cropper is the type of the cropperjs instance.
 */
export type Cropper = cropperjs;

/**
 * CropHandler is a function that handles the cropped canvas.
 */
export type CropHandler = (canvas: HTMLCanvasElement) => void;

/**
 * makeCropper creates a new cropperjs instance.
 */
export function makeCropper(img: HTMLImageElement, handleCrop: CropHandler) {
  const cropper = new cropperjs(img, {
    aspectRatio: 1,
    crop() {
      const cnv = cropper.getCroppedCanvas(CROPPER_OPTIONS);
      handleCrop(cnv);
    },
  });

  return cropper;
}

/**
 * CROPPER_OPTIONS are options for the cropperjs instance.
 */
export const CROPPER_OPTIONS: Cropper.GetCroppedCanvasOptions = {
  maxHeight: 1_200,
  maxWidth: 1_200,
  minWidth: 5,
  minHeight: 5,
};
