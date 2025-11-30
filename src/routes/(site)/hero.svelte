<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
  const badges = [
    { title: 'General Team', src: '/assets/badge-acm.svg', href: '/teams#general' },
    { title: 'AI Team', src: '/assets/badge-ai.svg', href: '/teams#ai' },
    { title: 'Algo Team', src: '/assets/badge-algo.svg', href: '/teams#algo' },
    { title: 'Design Team', src: '/assets/badge-design.svg', href: '/teams#design' },
    { title: 'Dev Team', src: '/assets/badge-dev.svg', href: '/teams#dev' },
    { title: 'Game Dev Team', src: '/assets/badge-gamedev.svg', href: '/teams#gamedev' },
    { title: 'ICPC Team', src: '/assets/badge-icpc.svg', href: '/teams#icpc' },
    { title: 'Marketing Team', src: '/assets/badge-marketing.svg', href: '/teams#marketing' },
    { title: 'Node Buds Team', src: '/assets/badge-node-buds.svg', href: '/teams#nodebuds' },
    { title: 'Open Source Team', src: '/assets/badge-open-source.svg', href: '/teams#oss' },
  ];
</script>

<section class="hero-container">
  <div class="hero-inner-container">
    <div class="hero-text">
      <h1 class="acm-heavier size-xl">
        <span>We are the largest</span> <span class="multicolor-text">Computer Science</span>
        <span>community at CSUF</span>
      </h1>
      <div class="join-button">
        <AcmButton text="Join today!" link="/discord" redirect={true} />
      </div>
    </div>

    <div class="orbit-container">
      <div class="capy-solo">
        <img
          src="/assets/capy-power-solo.svg"
          alt="Capy the Capybara surrounded by all the ACM Team Badges"
        />
      </div>

      {#each badges as badge, i}
        <div class="orbit" style="--i:{i}">
          <a title={badge.title} href={badge.href}>
            <img src={badge.src} alt="{badge.title} Badge" />
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .orbit-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .capy-solo img {
    position: absolute;
    width: 150px;
    height: 150px;
    transform: translate(-56%, -50%);
  }

  .orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3em;
    height: 3em;
    transform-origin: center center;
    animation: spin 72s linear infinite;
  }

  .orbit img {
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    0% {
      transform: rotate(calc(var(--i) * 36deg)) translate(110px) rotate(calc(-1 * var(--i) * 36deg));
    }
    100% {
      transform: rotate(calc(var(--i) * 36deg + 360deg)) translate(110px)
        rotate(calc(-1 * (var(--i) * 36deg + 360deg)));
    }
  }

  section {
    display: grid;
  }

  section .hero-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1em;
  }

  section .hero-inner-container .hero-text {
    display: grid;
    align-items: center;
    text-align: center;
    gap: 1em;
  }

  section .hero-inner-container .hero-text span {
    display: block;
  }

  /* Since we gave a display block to the span elements within the h1, 
   * each will cover the entire page width, causing issues with the 
   * multicolor linear-gradient (covering the webpage width rather than 
   * the actual text ONLY). Giving a display of inline-block to the span 
   * containing the multicolor text resolved this issue.
   */
  section .hero-inner-container .hero-text span.multicolor-text {
    display: inline-block;
    background: var(--acm-union);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  section .hero-inner-container .hero-text .join-button {
    display: grid;
    justify-self: center;
  }

  section .hero-inner-container {
    max-width: 90%;
    justify-self: center;
    animation-name: spin;
    animation-duration: 17s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  /* mobile view adjustments */
  @media screen and (min-width: 1000px) {
    section {
      display: grid;
      place-items: center;
      align-items: center;
    }

    section .hero-inner-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 4em;
      padding-top: 5em;
    }

    section .hero-inner-container .hero-text {
      text-align: start;
      margin: 2em;
    }

    section .hero-inner-container .hero-text .join-button {
      justify-self: start;
    }

    .capy-solo img {
      width: 250px;
      height: 250px;
      transform: translate(-56%, -50%);
    }

    .orbit {
      width: 5em;
      height: 5em;
    }

    @keyframes spin {
      0% {
        transform:
          rotate(calc(var(--i) * 36deg))
          translate(180px)
          rotate(calc(var(--i) * -36deg));
      }

      100% {
        transform:
          rotate(calc(var(--i) * 36deg + 360deg))
          translate(180px)
          rotate(calc((var(--i) * -36deg) - 360deg));
      }
    }
  }
</style>
