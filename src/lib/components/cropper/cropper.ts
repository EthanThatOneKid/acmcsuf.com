import Cropper from 'cropperjs';

type CropHandler = (canvas: HTMLCanvasElement) => void;

export function makeCropper(img: HTMLImageElement, handleCrop: CropHandler) {
  const cropper = new Cropper(img, {
    aspectRatio: 1,
    crop() {
      const cnv = cropper.getCroppedCanvas(o);
      handleCrop(cnv);
    },
  });

  return cropper;
}

const o: Cropper.GetCroppedCanvasOptions = {
  maxHeight: 1_200,
  maxWidth: 1_200,
  minWidth: 5,
  minHeight: 5,
};
