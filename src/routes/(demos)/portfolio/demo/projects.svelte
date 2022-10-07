<script>
  const projects = [
    {
      title: 'acmcsuf.com',
      description: 'Developed acmcsuf.com website',
      url: 'https://github.com/EthanThatOneKid/acmcsuf.com',
    },
    {
      title: 'Intro to Web Dev',
      description: 'Beginner friendly Web Dev series by acmDev',
      url: 'https://github.com/acmCSUFDev/intro-to-web-dev',
    },
    {
      title: 'ICON',
      description: 'Notion Canvas integration for students',
      url: 'https://github.com/acmCSUFDev/ICON',
    },
    {
      title: 'Food Tinder',
      description: 'tinder for matching people by food places',
      url: 'https://github.com/acmCSUFDev/Food-Tinder',
    },
  ];
</script>

<section class="container__projects" id="Projects">
  <p class="header--big">Projects</p>
  {#each projects as { title, description, url }}
    <div class="container__project">
      <a href={url} target="_blank">
        <p class="header__title">{title}</p>
      </a>
      <p>{description}</p>
    </div>
  {/each}
</section>

<style>
  .container__projects {
    margin-top: 10rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .header--big {
    font-size: 2.5rem;
    font-weight: 780;
  }

  .container__project {
    margin: 1rem;
  }

  .header__title {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    transition: 400ms all;
  }

  .header__title:hover {
    color: #2c91c6;
  }
</style>
