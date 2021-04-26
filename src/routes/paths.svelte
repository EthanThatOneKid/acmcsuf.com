<script lang="ts">
  import CommonHero from "@/components/sections/common-hero.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";
</script>

<CommonHero>
  <h1 slot="title">paths</h1>
  <h2 slot="headline">what are paths?</h2>
  <p slot="text">
    <span class="brand-em">paths</span> are committees that focus on certain
    areas related to the industry. students can discover new interests, enhance
    current skillsets, and specialize in specific fields through these
    committees. <span class="brand-em">paths</span> were designed to encourage teamwork
    and communication to prepare people for real-world opportunities in tech.
  </p>
</CommonHero>

<Spacing />

<section class="paths-screen-info turnback">
  <div id="acmalgo">
    <img src="../assets/png/acm-algo-badge.png" alt="acmAlgo Logo" />
    <div>
      <h2>
        <span class="brand-em">acm<span class="brand-purple">Algo</span></span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-purple">Algo</span></span> is
        our committee dedicated to building the programming proficiency of students.
        This committee focuses on increasing knowledge and understanding of data
        structures/algorithms, enhancing problem-solving abilities, and exploring
        competitve programing.
      </p>
    </div>
  </div>
  <div id="acmcreate">
    <img src="../assets/png/acm-create-badge.png" alt="acmCreate Logo" />
    <div>
      <h2>
        <span class="brand-em">acm<span class="brand-pink">Create</span></span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-pink">Create</span></span> is
        our committee dedicated to emphasizing the importance of product design.
        This committee focuses on designing the products of acmCSUF, educating students
        about the princples of UI/UX design, and exposing people to both technical
        and non-technical roles in the industry.
      </p>
    </div>
  </div>
  <div id="acmdev">
    <img src="../assets/png/acm-dev-badge.png" alt="acmDev Logo" />
    <div>
      <h2>
        <span class="brand-em">acm<span class="brand-bluer">Dev</span></span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-bluer">Dev</span></span> is
        our committee dedicated to bringing students of all skill-levels together
        through the use of hands-on projects and activities. This committee introduces
        students to the software development process, to the different types of technologies
        used by industry, and enhances people’s passion in STEM.
      </p>
    </div>
  </div>
</section>

<Spacing amount="175px" />

<CallToActionSection>
  <h2 slot="headline">how can i get involved?</h2>
  <p slot="text">
    Our paths host their own events all the time! Follow us on social media to
    get notified for when they happen. Until then, we invite you to become a
    part of our chapter to start off your tech journey on the right foot.
  </p>
</CallToActionSection>

<Spacing amount="175px" />

<style>
  .turnback div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 100px;
  }

  .turnback div h2 {
    padding-bottom: 48px;
    font-size: var(--subheading-font-size);
  }

  .turnback div p {
    font-size: var(--body-font-size);
  }

  .turnback:nth-child(even) {
    flex-flow: row-reverse;
  }

  .turnback:nth-child(even) div {
    align-items: flex-start;
  }

  .turnback:nth-child(even) p {
    text-align: left;
  }

  @media screen and (max-width: 756px) {
    .turnback {
      flex-direction: column;
      align-items: center;
      flex-flow: column !important;
    }

    .turnback div {
      justify-content: center;
      align-items: center;
    }

    .turnback div p,
    .turnback div h2 {
      width: 100%;
      text-align: center !important;
    }

    .turnback div img {
      width: 80px;
      height: 80px;
    }

    .turnback div div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      flex-flow: column !important;
    }

    .turnback div h2 {
      text-align: center;
      font-weight: bold;
    }
    .turnback div p {
      text-align: right;
    }
  }
</style>
