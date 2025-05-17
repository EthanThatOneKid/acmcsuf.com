import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { LINKS } from "$lib/public/links";
import { resolve } from "$lib/server/links/resolve";
import { genQRCodeSvg } from "$lib/server/links/qr";

function trimSuffix(str: string, suffix: string): string {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}

export async function GET(event: RequestEvent) {
  const url = new URL(event.request.url);
  const pathname = trimSuffix(url.pathname, ".svg");
  const destination = resolve(
    new URL(`${url.origin}${pathname}${url.search}${url.hash}`),
    LINKS,
  );
  if (!destination) {
    throw error(404, "Invalid link");
  }

  const qrCodeSvg = await genQRCodeSvg(destination.toString());
  return new Response(qrCodeSvg, {
    status: 200,
    headers: { "Content-Type": "image/svg+xml" },
  });
}
