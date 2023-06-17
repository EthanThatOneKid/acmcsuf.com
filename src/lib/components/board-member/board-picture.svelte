<script lang="ts">
  /**
   * See: https://codepen.io/alancortez1337/pen/NWzKqKE?editors=1100
   */
  export let src: string;
  export let alt: string;
  export let color: string;
</script>

<svg viewBox="0 0 1037 1037" fill="none" xmlns="http://www.w3.org/2000/svg" style:--color={color}>
  <defs>
    <clipPath id="shape">
      <path
        d="M53.093 646.116C-17.6508 575.372 -17.6508 460.674 53.093 389.93L389.93 53.0929C460.674 -17.6509 575.372 -17.6509 646.116 53.093L982.954 389.93C1053.7 460.674 1053.7 575.372 982.954 646.116L646.116 982.953C575.372 1053.7 460.674 1053.7 389.93 982.953L53.093 646.116Z"
        fill="#2C91C6"
      />
    </clipPath>
  </defs>
  <image clip-path="url(#shape)" xlink:href={src} />
</svg>

<style lang="scss">
  svg {
    filter: drop-shadow(0px 0px 10px rgba(var(--color, var(--acm-general-rgb)), 0.5));
    width: 140px;
    height: 140px;

    &:hover,
    input:checked[type='checkbox'] + .officer-3d-flipcard .officer-image {
      /* This hack stays until we can resolve #348. */
      transform: scale(1.06) rotateZ(1.2deg);
      transition: all 0.2 cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  image {
    width: 100%;
    height: 100%;
  }
</style>
