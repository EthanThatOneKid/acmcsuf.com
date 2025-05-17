/**
 * uploadPicture uploads a picture to Discord and returns the media
 * URL.
 *
 * See:
 * https://etok.codes/discord_uploader#readme
 */
export async function uploadPicture(blob: Blob): Promise<URL> {
  const formData = new FormData();
  formData.append("file", blob, "picture.webp");

  // Upload to Discord.
  const response = await fetch("https://discord-uploader.netlify.app/upload", {
    method: "POST",
    body: formData,
  });
  const responseBody = await response.json();

  // Parse link from Discord response.
  if (responseBody?.attachments.length !== 1) {
    throw new Error(
      "Discord response does not contain exactly one attachment.",
    );
  }

  return new URL(responseBody.attachments[0].proxy_url);
}
