/*
 *  Naming convention for assets sub-folders:
 *    sprites folder- has 'Image' in the name
 *    effects folder - has 'Effect' in the name
 *    background folder - all other file names
 */
const imageArr = [
  'capyImage.png',
  'layer1.png',
  'layer2.png',
  'layer3.png',
  'layer4.png',
  'beeImage.png',
  'wizardImage.png',
  'wolfImage.png',
  'hedgehogImage.png',
  'fireEffect.gif',
  'gravityEffect.gif',
  'boomEffect.png',
  'bars.png',
];

/**
 * @type {Object.<string, HTMLImageElement>}
 */
const images = {};
imageArr.forEach((imageName) => {
  const name = imageName.split('.')[0];
  // TODO: Fix "ReferenceError: Image is not defined" error.
  images[name] = new Image();
  images[name].src = '/assets/error-game/' + imageName;
});

export { images };

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}