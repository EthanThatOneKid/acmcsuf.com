<script lang="ts">
  import type { Hackathon } from '$lib/public/hackathons';

  export let data: Hackathon;

  let top = 200;
  let bottom = 200;

  let looking = false;
  const handleIntersection = (entries: any, observer: any) => {
    for (const entry of entries) {
      //entry.target.style.setProperty('--mycolor', entry.isIntersecting ? 'red' : 'blue');s
      if (entry.isIntersecting) {
        entry.target.classList.remove('exit');
        entry.target.classList.add('newthing');
        looking = true;
      } else {
        entry.target.classList.remove('newthing');
        entry.target.classList.add('exit');
        looking = false;
      }
    }
  };

  let observer: IntersectionObserver;
  function observe(node: any) {
    const rootMargin = `${-bottom}px 0px ${-top}px 0px`;
    if (!observer) {
      observer = new IntersectionObserver(handleIntersection, { rootMargin });
    }

    observer.observe(node);

    return {
      destroy: () => {
        observer.unobserve(node);
      },
    };
  }
</script>

<section class="hackathon" id={data.id} use:observe>
  <h2><a href="#{data.id}">{data.title}</a></h2>
  <p>📅 {data.date}</p>
  <p>📍 {data.location}</p>
  <img src="/assets/hackathon-{data.id}.webp" alt="{data.title} website" />
</section>

<style>
  :global(.hackathon) {
    opacity: 0;
    scroll-margin-top: 100px;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*transform: translateY(25%);*/
    /*animation: fadein 1.5s ease-in-out;*/
  }

  :global(.newthing) {
    opacity: 1;
    animation: fadein 0.75s ease-in;
  }

  :global(.exit) {
    animation: fadeout 0.75s ease-out;
  }

  .hackathon img {
    max-width: 50%;
    height: auto;
    margin-top: 1em;
  }

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateX(10%);
    }

    75% {
      transform: translateX(-1%);
    }

    85% {
      transform: translateX(0.5%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes fadeout {
    0% {
      transform: translateX(0%);
      opacity: 1;
    }

    100% {
      transform: translateX(10%);
      opacity: 0;
    }
  }
</style>
