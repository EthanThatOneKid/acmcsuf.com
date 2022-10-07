<script>
  const exps = [
    {
      title: 'Shark Gang Lead',
      duration: 'Jan 2022 - Present',
    },
    {
      title: 'Vegan Shark',
      duration: 'Jan 2021 - Jan 2022',
    },
    {
      title: 'Junior Shark',
      duration: 'Jan 2020 - Jan 2021',
    },
    {
      title: 'Baby Shark',
      duration: 'Jan 2019 - Jan 2020',
    },
  ];
</script>

<section class="container__exps" id="Experiences">
  <p class="header--big">Experiences</p>
  {#each exps as { title, duration }}
    <div class="container__exp">
      <p class="header__title">{title}</p>
      <p class="header__duration">{duration}</p>
    </div>
  {/each}
</section>

<style>
  .container__exps {
    margin-top: 10rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .header--big {
    font-size: 2.5rem;
    font-weight: 780;
  }

  .container__exp {
    background-color: #2c91c6;
    border-radius: 2rem;
    margin: 1rem;
  }

  .header__title {
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>
