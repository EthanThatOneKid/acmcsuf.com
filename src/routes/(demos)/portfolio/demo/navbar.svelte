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
    padding: 0.35rem;
    margin: 0 2rem;
    border-radius: 12px;
  }
</style>
