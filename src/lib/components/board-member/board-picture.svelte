<script lang="ts">
  /**
   * See: https://codepen.io/alancortez1337/pen/NWzKqKE?editors=1100
   */
  export let src: string;
  export let color: string;
  export let legacy = false;
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
  <foreignObject x="0" y="0" width="100%" height="100%" clip-path="url(#shape)">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <img {src} alt="Board member" class:legacy />
    </div>
  </foreignObject>
</svg>

<style lang="scss">
  svg {
    filter: drop-shadow(0px 0px 10px rgba(var(--color, var(--acm-general-rgb)), 0.5));
    width: 140px;
    height: 140px;

    &:hover {
      transform: scale(1.06) rotateZ(1.2deg);
      transition: all 0.2 cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  img {
    width: 100%;
    height: 100%;

    &.legacy {
      width: calc(155%);
      height: calc(155%);
      transform: translate(-17.75%, -14.5%);
    }
  }
</style>
