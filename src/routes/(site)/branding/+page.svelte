<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';

  import TeamCard from './team-card.svelte'

  const cards = [
    {
      title: "General",
      description: "The ACM general team is a dynamic group of individuals driving the success of our organization." +
      " ACM General manages operations, organizes events, and ensure the smooth functioning of ACM." +
      "They are the backbone of our community, fostering collaboration and innovation among members."
    },
    {
      title: "AI",
      description: "The artificial intelligence team is dedicated to providing accessible information" +
      "about artificial intelligence and machine learning to all. AI focuses on fun projects " +
      "geared towards beginners in the field."
    },
    {
      title: "Algo",
      description: "The algorithm team is dedicated to building programming fundamentals within students. " +
      "Algo focuses on mastering data structures and algorithms, enhancing problem solving abilities, and" +
      " exploration of competitive programming."
    },
    {
      title: "Open Source",
      description: "Our inspiration for this team surrounds this area of exploring space." +
      "The world of open source programming is endless and diving into it might seem " +
      "scary at first, but we find that discovering new things to be exciting. To best " +
      "represent this, our logo was designed as a rocket ship to represent the ability to launch" +
      "into the vast expanse of collaborative development, exploring new frontiers and " +
      "innovating together"
    },
    {
      title: "Design",
      description: "The design team is dedicated to emphasizing the importance of product design " +
      "and product management in the tech industry. Design focuses on educating students about " +
      "design principles, design tools, and the intricacies of conceptualization, development, "+
      "and management of a product."
    },
    {
      title: "Dev",
      description: "The development team is dedicated to giving students the opportunity to explore tech " +
      "via hands-on projects and activities. Dev focuses on introducing students to software development, and" + 
      " the various tech stacks used in the industry."
    },
    { 
      title: "Game Dev",
      description: "The game development team is dedicated to teaching the basics of programming in the " +
      "gaming industry. Gamedev focuses on educating students about design principles, design tools," +
      " and the development process of a project."
    },
    { 
      title: "ICPC",
      description: "The Intercollegiate Competitive Programming Competition is a contest to challenge students on their algorithms" + 
      " and problem solving skills. The ICPC Team is dedicated to preparing students for the competition by hosting " +
      "weekly practice sessions and mock contests."
    },
    {
      title: "Marketing",
      description: "The marketing team has a strong passion towards advertising and spreading word on " +
      " all our ACM events. Marketing utilizes their expertise in digital strategies and creative storytelling " +
      "to display a welcoming environment to all students."
    }, 
    {
      title: "Node Buds",
      description: "Connect & grow with node buds! Our big-little program pairs you with an experienced club " +
      "officer for social events, workshops, and guidance as you navigate the tech world. Build friendships, " +
      "skills, and have a blast!"
    }
  ]

</script>

<svelte:head>
  <title>Branding | ACM at CSUF</title>
</svelte:head>


<Spacing --min="175px" --med="200px" --max="200px" />

<main class="responsive-width">
  <section id="top">
    <div class="header">
      <h1 class="size-xl">BRANDING</h1>
      <p>Find information about our branding alongside a collection of resources and assets.</p>

    </div>

    {#each cards as card}
      <TeamCard
        title={card.title}
        description={card.description}
      />
      <br>
    {/each}




  </section>

  <p>
    <a href="#top">Back to top</a> | <a href="/global.css">global.css</a>
  </p>
</main>


<style>
  .responsive-width {
    width: min(80ch, 80vw);
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    .responsive-width {
      width: 100%;
    }
  }

  p {
    margin: 1em 0;
    word-break: break-word;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  main section {
    margin: 0 auto;
    margin-bottom: 50px;
  }

  main h1 {
    text-align: center;
    margin: 0;
  }

  main a {
    transition: 0.25s ease-in-out;
  }

  main:hover {
    color: var(--acm-blue);
  }
</style>
