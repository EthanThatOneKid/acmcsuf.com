<script lang="ts">
  import type { Hackathon } from '$lib/public/hackathons';

  export let data: Hackathon;

  const handleIntersection = (entries: any, observer: any) => {
    for (const entry of entries) {
      //entry.target.style.setProperty('--mycolor', entry.isIntersecting ? 'red' : 'blue');
      if (entry.isIntersecting) {
        entry.target.classList.add('newthing');
      } else {
        entry.target.classList.remove('newthing');
        //entry.target.classList.remove('newthing');
      }
    }
  };

  let observer: IntersectionObserver;
  function observe(node: any) {
    if (!observer) {
      observer = new IntersectionObserver(handleIntersection);
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
    scroll-margin-top: 100px;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*transition: var(--shown);*/
    /*transition: all 1.5s ease;*/
    /*animation: fadeIn 1.5s ease-in-out;*/
  }

  :global(.newthing) {
    animation: fadeIn 1.5s ease-in-out;
    background-color: var(--shown);
    transform: translateX(30%);
  }

  .hackathon img {
    max-width: 50%;
    height: auto;
    margin-top: 1em;
  }

  @keyframes -global-fadein {
    0% {
      opacity: 0;
      transform: translateY(25%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
</style>
