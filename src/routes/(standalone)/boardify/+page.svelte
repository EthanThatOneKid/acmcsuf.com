<script lang="ts">
  // import Cropper from '$lib/components/cropper/index.svelte';
  // import { getCroppedImg } from '$lib/components/cropper/canvasUtil';
  import Cropper from '$lib/components/cropper/cropper.svelte';

  // let cropX: string;
  // let cropY: string;
  // let profileWidth: string;

  // let image: string | null | undefined;
  // let fileinput: HTMLInputElement;
  // let pixelCrop: any;
  // let croppedImage: any;

  // const defaultSrc = 'https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg';

  // function onFileSelected(
  //   e: Event & { currentTarget: EventTarget & HTMLInputElement & { files: FileList } }
  // ) /*: Event & { currentTarget: EventTarget & HTMLInputElement;target?:})*/ {
  //   let imageFile = e.currentTarget?.files[0];
  //   let reader = new FileReader();
  //   reader.onload = (e) => {
  //     image = e.target?.result as string;
  //   };
  //   reader.readAsDataURL(imageFile);
  // }

  // let profilePicture: HTMLImageElement;
  // let style: any;

  // function previewCrop(e: { detail: { pixels: { x: any; y: any; width: any } } }) {
  //   pixelCrop = e.detail.pixels;
  //   const { x, y, width } = e.detail.pixels;
  //   const scale = 200 / width;

  //   // TODO: Pass as reactive CSS variables
  //   cropX = `${-x * scale}px`;
  //   cropY = `${-y * scale}px`;
  //   profileWidth = `${profilePicture.naturalWidth * scale}px`;
  //   // TODO: rewrite to CSS c
  // }

  // async function cropImage() {
  //   croppedImage = await getCroppedImg(image, pixelCrop);
  // }

  // function reset() {
  //   croppedImage = null;
  //   image = null;
  // }
</script>

<Cropper />

<style>
</style>
