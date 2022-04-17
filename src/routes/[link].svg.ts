import QRCodeStyling from 'qr-code-styling'; 

import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal';

import { links } from '$lib/constants';

  export async function get(event: RequestEvent<{ link: string }>): Promise<RequestHandlerOutput> {
    const payload = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: links[event.params.link],
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      dotsOptions: {
          color: "#4267b2",
          type: "rounded"
      },
      backgroundOptions: {
          color: "#e9ebee",
      },
      imageOptions: {
          crossOrigin: "anonymous",
          margin: 20
      }
    });
    if (typeof payload == 'undefined') {
      return new Response('404 Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })
    }
  
    return new Response(await payload.()),{
      status: 200,
      headers: {'Content-Type': 'application/json'},
    };
  
  } 
