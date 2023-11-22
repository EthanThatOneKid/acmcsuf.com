<script lang="ts">
  export let src: string;
  export let reducedMotionSrc: string;
  export let altSrc: string;
</script>

  
  
  <img class="reduced-motion" src={reducedMotionSrc} alt={altSrc} />

  <svg class="non-reduced-motion" viewBox="-50 -50 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="shape2">
        <path
          d="M53.093 646.116C-17.6508 575.372 -17.6508 460.674 53.093 389.93L389.93 53.0929C460.674 -17.6509 575.372 -17.6509 646.116 53.093L982.954 389.93C1053.7 460.674 1053.7 575.372 982.954 646.116L646.116 982.953C575.372 1053.7 460.674 1053.7 389.93 982.953L53.093 646.116Z"
        />
      </clipPath>
    </defs>

    <!-- Create a path for the border -->
    <g transform="translate(-50, -50) scale(1.1)">
      <path
        d="M53.093 646.116C-17.6508 575.372 -17.6508 460.674 53.093 389.93L389.93 53.0929C460.674 -17.6509 575.372 -17.6509 646.116 53.093L982.954 389.93C1053.7 460.674 1053.7 575.372 982.954 646.116L646.116 982.953C575.372 1053.7 460.674 1053.7 389.93 982.953L53.093 646.116Z"
        fill="rgba(var(--color, var(--acm-general-rgb))"
      />
    </g>

    <image clip-path="url(#shape2)" xlink:href={src} />
  </svg>

<style lang="scss">
  svg, img {
    max-width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
    justify-self: center;
  }
  .reduced-motion {
      display: none;
    }
  @media (prefers-reduced-motion: reduce) {
    .reduced-motion {
      display: initial;
    }
    .non-reduced-motion {
      display: none;
    }
  }
  image {
    width: 87%;
    height: 87%;
  }
</style>
