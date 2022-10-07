<script lang="ts">
  import { onMount } from 'svelte';

  const navItems = [
    { title: 'About', url: '#About' },
    { title: 'Experiences', url: '#Experiences' },
    { title: 'Projects', url: '#Projects' },
  ];
  let time = new Date(Date.now());
  const options = {
    weekday: 'long',
  } as const;

  // Prevent automatic scrolling
  onMount(() => (history.scrollRestoration = 'manual'));
</script>

<nav>
  <section class="container__nav" id="/">
    {#each navItems as { title, url }}
      <a href={url} class="nav__item">
        {title}
      </a>
    {/each}
    <p class="time">{time.toLocaleDateString(undefined, options)}</p>
  </section>
</nav>

<style>
  /* The BEM CSS class naming convention is used in this demo. For
  small projects, BEM may feel overkill. BEM works best in larger
  projects as a way of preventing CSS class naming conflicts. */

  .container__nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .nav__item {
    color: white;
    font-weight: 600;
    font-size: 2rem;
    margin: 0 2rem;
    transition: all 400ms;
  }

  .nav__item:hover {
    color: rgb(0, 157, 255);
  }

  .time {
    color: #1a1a1a;
    font-weight: 700;
    background-color: #2c91c6;
    padding: 0.1rem 0.45rem;
    margin: 0 2rem;
    border-radius: 12px;
  }

  @media screen and (max-width: 768px) {
    .container__nav {
      flex-direction: column;
      align-items: end;
    }

    .container__nav,
    .nav__item {
      font-size: 1.2rem;
    }
  }
</style>
