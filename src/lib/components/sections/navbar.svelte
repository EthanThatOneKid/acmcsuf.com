<script lang="ts">
  import { page } from '$app/stores';
  import LightMode from '$lib/components/icons/light-mode.svelte';
  import DarkMode from '$lib/components/icons/dark-mode.svelte';
  import AcmToggle from '$lib/components/utils/acm-toggle.svelte';
  import { AcmTheme, theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  let jsEnabled = false;
  onMount(() => (jsEnabled = true));

  const navItems = [
    { title: 'About', path: '/about' },
    { title: 'Events', path: '/events' },
    { title: 'Paths', path: '/paths' },
    { title: 'Node Buds', path: '/nodebuds' },
    { title: 'Blog', path: '/blog' },
  ];

  let checkbox: HTMLInputElement;
  function handleClose() {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  }
</script>

<nav>
  <input type="checkbox" id="navToggle" class="toggle" bind:this={checkbox} />

  <div class="container">
    <div class="logo-container">
      <a href="/" class="logo">
        <img src="assets/badges/general.svg" class="badge" alt="acmCSUF badge" />
        <h3 class="brand-header">at <b>CSUF</b></h3>
      </a>
    </div>

    <section>
      <ul class="pages">
        {#each navItems as { title, path } (path)}
          <li>
            <a
              on:click={() => handleClose()}
              href={path}
              class="brand-header size-sm"
              aria-current={path === $page.url.pathname}
              sveltekit:prefetch
            >
              {@html title}
            </a>
          </li>
        {/each}
      </ul>

      {#if jsEnabled}
        <div class="toggle-container">
          <!-- true is dark -->
          <AcmToggle
            checked={$theme === AcmTheme.Dark}
            on:toggle={(event) => ($theme = event.detail ? AcmTheme.Dark : AcmTheme.Light)}
          >
            <span class="dark-toggle">
              {#if $theme === AcmTheme.Dark}
                <LightMode />
              {:else}
                <DarkMode />
              {/if}
            </span>
          </AcmToggle>
        </div>
      {/if}
    </section>
  </div>

  <label for="navToggle" class="menu">
    <div class="menuLine" />
    <div class="menuLine" />
    <div class="menuLine" />
  </label>
</nav>

<style lang="scss">
  nav {
    display: flex;
    position: fixed;
    width: 100%;
    justify-content: center;
    padding: 16px 0;
    background-color: var(--navbar-bg);
    box-shadow: 0 3px 12px rgba(16, 19, 21, 0.1);
    z-index: 10;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      width: 1280px;

      .logo-container {
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          gap: 4px;

          .badge {
            height: 64px;
            width: auto;
            filter: drop-shadow(0 1.5px 4.5px rgba(44, 145, 198, 0.5));
          }

          h3 {
            /* None of the CSS sizing tags are used here because the logo text scales to very specific px sizes */
            font-size: clamp(1.25rem, 1.2039rem + 0.2632vw, 1.625rem);
          }
        }
      }

      section {
        display: flex;
        align-items: center;
        gap: 64px;

        .pages {
          display: flex;
          gap: 64px;
          list-style: none;

          a {
            text-decoration: none;
            transition: 0.25s ease-in-out;

            &:hover,
            &[aria-current='true'] {
              color: var(--acm-blue);
            }
          }
        }

        .toggle-container {
          display: flex;
          justify-content: flex-end;

          .dark-toggle {
            display: flex;
            align-items: center;
            max-width: fit-content;
            padding: 6px 12px;
            background-color: var(--acm-gray);
            border-radius: 8px;
            gap: 4px;
            transition: 0.25s ease-in-out;

            &:hover {
              cursor: pointer;
              background-color: #3d4043;
            }
          }
        }
      }
    }

    .toggle,
    .menu {
      display: none;
      z-index: 10;
    }
  }

  @media screen and (max-width: 900px) {
    nav {
      .container {
        .logo-container .logo .badge {
          height: 48px;
        }

        .pages {
          position: fixed;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          top: 0;
          right: 0;
          height: 0;
          width: 100%;
          gap: 0;
          background-color: var(--acm-light);
          overflow: hidden;
          z-index: 9;
          transition: 0.25s ease-in-out;

          a {
            font-size: var(--size-md);
          }
        }
      }

      .toggle-container .dark-toggle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 56px;
      }

      .menu {
        display: block;
        position: absolute;
        padding: 8px;
        top: 50%;
        transform: translateY(-50%);
        right: 8px;
        cursor: pointer;

        .menuLine {
          width: 24px;
          height: 2px;
          margin: 6px 0;
          background-color: var(--acm-dark);
          transition: 0.25s ease-in-out;
        }

        &:hover {
          .menuLine {
            background-color: var(--acm-blue);
          }
        }
      }

      & :checked ~ .container {
        .pages {
          height: 100vh;
        }
      }

      & :checked ~ .menu {
        .menuLine {
          background-color: var(--acm-blue);
          &:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
          }
        }
      }
    }
  }
</style>
