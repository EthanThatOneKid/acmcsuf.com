<script lang="ts">
  import { onMount } from 'svelte';
  import Hackathon from './hackathon.svelte';
  import HACKATHONS from './data';
  import type { Hackathon as HackathonType } from '$lib/public/hackathons';

  // Extract year from date string
  function getYear(dateStr: string): number {
    const match = dateStr.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
  }

  // Sort hackathons by year
  const sortedHackathons: HackathonType[] = [...HACKATHONS].sort(
    (a, b) => getYear(b.date) - getYear(a.date)
  );

  // Group hackathons by year
  const hackathonsByYear: Record<number, HackathonType[]> = {};
  for (const hackathon of sortedHackathons) {
    const year = getYear(hackathon.date);
    if (!hackathonsByYear[year]) {
      hackathonsByYear[year] = [];
    }
    hackathonsByYear[year].push(hackathon);
  }

  // Get sorted years
  const years = Object.keys(hackathonsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Back to top button visibility
  let showBackToTop = false;

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Scroll to year function scrolls to first hackathon of that year
  function scrollToYear(year: number) {
    const hackathons = hackathonsByYear[year];
    if (hackathons && hackathons.length > 0) {
      const firstHackathon = hackathons[0];
      const element = document.getElementById(firstHackathon.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onMount(() => {
    function handleScroll() {
      showBackToTop = window.scrollY > 500;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:head>
  <title>Hackathons | ACM at CSUF</title>
</svelte:head>

<!-- Year sections with alternating backgrounds -->
{#each years as year, index (year)}
  <section
    id="year-{year}"
    class="year-section"
    class:first-section={index === 0}
    class:alt-bg={index % 2 === 1}
  >
    <div class="year-section-content">
      <!-- Show header only in the first section -->
      {#if index === 0}
        <header class="page-header">
          <h1><span class="title-accent">ACM</span> at CSUF Hackathons</h1>
          <p class="page-caption">
            Journey through our annual hackathons and see how it all started. Open to students from
            all colleges and universities as we support and motivate the next generation of
            builders.
          </p>

          <nav class="year-nav">
            {#each years as navYear (navYear)}
              <button class="year-pill" on:click={() => scrollToYear(navYear)}>
                {navYear}
              </button>
            {/each}
          </nav>
        </header>
      {/if}

      <div class="hackathons-grid">
        {#each hackathonsByYear[year] as hackathon (hackathon.id)}
          <Hackathon data={hackathon} />
        {/each}
      </div>
    </div>
  </section>
{/each}

<button
  class="back-to-top"
  class:visible={showBackToTop}
  on:click={scrollToTop}
  aria-label="Back to top"
>
  ↑
</button>

<style>
  .page-header {
    text-align: center;
    max-width: 1400px;
    margin: 0 auto 2rem;
  }

  .page-header h1 {
    margin-bottom: 1rem;
  }

  .title-accent {
    color: #00b0ff;
  }

  .page-caption {
    font-size: 1.1rem;
    opacity: 0.85;
    max-width: 50ch;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Year quick navigation */
  .year-nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .year-pill {
    background: rgba(0, 176, 255, 0.1);
    border: 1px solid rgba(0, 176, 255, 0.3);
    color: #00b0ff;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .year-pill:hover {
    background: rgba(0, 176, 255, 0.2);
    transform: translateY(-2px);
  }
  .year-section {
    width: 100%;
    max-width: 100%;
    padding: 3rem 2rem;
    box-sizing: border-box;
    overflow-x: hidden;
    background-color: var(--acm-odd);
  }

  /* First section needs extra top padding for navbar */
  .year-section.first-section {
    padding-top: 200px;
  }

  /* Alternating background using same variables as teams page */
  .year-section.alt-bg {
    background-color: var(--acm-even);
  }

  .year-section-content {
    max-width: 1400px;
    margin: 0 auto;
  }

  .hackathons-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;
  }

  /* When there's only one hackathon in a year center it */
  .hackathons-grid > :global(:only-child) {
    grid-column: 1 / -1;
  }

  /* Back to top button */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #00b0ff;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 176, 255, 0.4);
    z-index: 1000;
  }

  .back-to-top:hover {
    background: #00c8ff;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 176, 255, 0.5);
  }

  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 1024px) {
    .hackathons-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  @media (max-width: 768px) {
    .page-header {
      margin-bottom: 1.5rem;
    }

    .page-caption {
      font-size: 1rem;
      max-width: 35ch;
    }

    .year-nav {
      gap: 0.5rem;
    }

    .year-pill {
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
    }

    .year-section {
      padding: 2rem 1rem;
    }

    .year-section.first-section {
      padding-top: 150px;
    }

    .back-to-top {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 45px;
      height: 45px;
      font-size: 1.25rem;
    }
  }
</style>
