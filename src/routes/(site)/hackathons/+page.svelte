<script lang="ts">
  import ScrollToTop from '$lib/components/scroll-to-top/scroll.svelte';
  import Hackathon from './hackathon.svelte';
  import HACKATHONS from './data';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import type { Hackathon as HackathonType } from '$lib/public/hackathons';

  // Extract year from date string (e.g., "April 2025" -> 2025)
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

  // Scroll to year function - scrolls to first hackathon of that year
  function scrollToYear(year: number) {
    const hackathons = hackathonsByYear[year];
    if (hackathons && hackathons.length > 0) {
      const firstHackathon = hackathons[0];
      const element = document.getElementById(firstHackathon.id);
      if (element) {
        const navbarHeight = 80;
        const extraPadding = 20;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight - extraPadding;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
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
    class:alt-bg={index % 2 === 0}
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
              <button
                class="year-pill"
                on:click={() => scrollToYear(navYear)}
                aria-label="Jump to {navYear} hackathons"
              >
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

<Spacing --min="100px" --med="125px" --max="125px" />

<ScrollToTop />

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
  }
</style>