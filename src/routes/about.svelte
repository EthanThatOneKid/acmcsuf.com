<script lang="ts">
  import CommonHero from "@/components/sections/common-hero.svelte";
  import OfficerProfileList from "@/components/about/officer-profile-list.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import Header from "@/components/about/what-is-acm.svelte";
  import Admonition from "../components/utils/admonition.svelte";
</script>

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<Header />

<Spacing minAmount="32px" maxAmount="64px" />

<CommonHero>
  <h2 slot="headline" class="size-l">Who are we?</h2>
  <p slot="text" class="size-xs">
    <span class="headers">
      acm<span class="brand-em brand-blue">CSUF</span>
    </span>
    is a student chapter of the
    <a
      href="https://acm.org"
      class="acm-text"
      target="_blank"
      rel="noopener noreferrer"
    >
      Association for Computing Machinery
    </a>, an international organization based in New York that advocates for the
    advancement of computer science as a science and profession. Our chapter
    based in California State University, Fullerton focuses on bringing
    passionate Titans together to be involved in the tech community via
    workshops, info sessions, community events, and more!
  </p>
</CommonHero>

<Spacing amount="150px" />

<!-- TODO: Get the content below from the `/events.json` endpoint and just
display the most upcoming event with a reminder/notice flair. -->
<Admonition
  path="nodebuds"
  expiration="{new Date('Sat Oct 07 2021 00:00:00 GMT-0700').valueOf()}"
>
  Looking to improve your computer science skills AND make a friend in the
  process? Join <span class="headers brand-light"
    >node<span class="brand-em brand-red">Buds</span></span
  >, our mentorship program where students get paired with 
  <span class="brand-med brand-light">Buddies</span>
  that'll help you learn new things and improve your coding abilities.
  <br><br>
  <a href="/nbapp" class="link headers brand-light">Click here to apply now!</a>
</Admonition>

<Spacing amount="150px" />

<div class="container">
  <h2 class="headers size-l">Board members</h2>
</div>

<Spacing amount="16px" />

<OfficerProfileList />

<Spacing minAmount="40px" amount="95px" maxAmount="120px" />

<style lang="scss">
  @import "static/theme.scss";

  .container {
    display: flex;
    justify-content: center;
  }

  .acm-text {
    text-decoration: none;
    font-weight: 500;
    color: var(--acm-dark);
    transition: color 0.25s ease-in-out;
  }

  .acm-text:hover {
    color: var(--acm-blue);
  }

  .link {
    text-decoration: none;
    transition: color 0.25s ease-in-out;
  }

  .link:hover {
    color: var(--acm-red);
  }
</style>
