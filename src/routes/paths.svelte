<script lang="ts">
  import { acmAlgo, acmCreate, acmDev } from "../lib/acm-paths";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import PathSection from "@/components/paths/path-section.svelte";
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
<PathSection info="{acmAlgo}" textAlign="right">
  <p slot="content">
    <span class="brand-em">acm<span class="brand-purple">Algo</span></span> is our
    committee dedicated to building the programming proficiency of students. This
    committee focuses on increasing knowledge and understanding of data structures/algorithms,
    enhancing problem-solving abilities, and exploring competitve programing.
  </p>
</PathSection>
<Spacing />
<PathSection info="{acmCreate}" textAlign="left">
  <p slot="content">
    <span class="brand-em">acm<span class="brand-pink">Create</span></span> is our
    committee dedicated to emphasizing the importance of product design. This committee
    focuses on designing the products of acmCSUF, educating students about the princples
    of UI/UX design, and exposing people to both technical and non-technical roles
    in the industry.
  </p>
</PathSection>
<Spacing />
<PathSection info="{acmDev}" textAlign="right">
  <p slot="content">
    <span class="brand-em">acm<span class="brand-bluer">Dev</span></span> is our
    committee dedicated to bringing students of all skill-levels together through
    the use of hands-on projects and activities. This committee introduces students
    to the software development process, to the different types of technologies used
    by industry, and enhances people’s passion in STEM.
  </p>
</PathSection>
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
