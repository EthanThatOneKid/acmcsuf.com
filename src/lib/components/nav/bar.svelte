<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Toggle from '$lib/components/toggle/toggle.svelte';
  import { AcmTheme, theme } from '$lib/public/legacy/theme';

  let jsEnabled = false;
  onMount(() => (jsEnabled = true));

  const navItems = [
    { title: 'About', path: '/about' },
    { title: 'Events', path: '/events' },
    { title: 'Teams', path: '/teams' },
    { title: 'Blog', path: '/blog' },
  ];

  let checkbox: HTMLInputElement;

  function handleClose(ev: Event) {
    ev.stopPropagation();
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  }
</script>

<nav>
  <input type="checkbox" id="navToggle" class="toggle" bind:this={checkbox} />

  <div class="blurrybar" />

  <div class="backdrop" on:click={handleClose} on:keypress={handleClose} />

  <div class="container">
    <div class="logo-container">
      <a href="/" class="logo">
        <img src="/assets/badges/general.svg" class="badge" alt="acmCSUF badge" />
        <h3 class="brand-header">at <b>CSUF</b></h3>
      </a>
    </div>

    <section>
      <ul class="pages">
        {#each navItems as { title, path } (path)}
          <li>
            <a
              on:click={handleClose}
              on:keypress={handleClose}
              href={path}
              class="brand-header size-sm"
              aria-current={path === $page.url.pathname}
            >
              {@html title}
            </a>
          </li>
        {/each}
      </ul>

      <div class="toggle-container" class:hidden={!jsEnabled}>
        <Toggle
          checked={$theme === AcmTheme.Dark}
          on:toggle={(event) => ($theme = event.detail ? AcmTheme.Dark : AcmTheme.Light)}
        >
          <noscript>
            <style>
              .dark-toggle {
                opacity: 0;
              }
            </style>
          </noscript>
          <span class="dark-toggle">
            <img
              src={`/assets/svg${$theme === AcmTheme.Dark ? '/moon' : '/sun'}.svg`}
              alt="theme"
            />
          </span>
        </Toggle>
      </div>
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
    width: 100vw;
    justify-content: center;
    padding: 16px 0;
    z-index: 10;

    .blurrybar {
      position: absolute;
      width: 100%;
      height: 100px;
      margin-top: -20px;
      background-color: var(--navbar-bg);
      box-shadow: var(--nav-shadow);
      z-index: -1;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }

    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      opacity: 0;
      background-color: var(--perma-dark);
      transition: opacity 0.25s ease-in;
      pointer-events: none;
    }

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
            z-index: -1;
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
        height: 100%;

        .pages,
        li,
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .pages {
          gap: 50px;
          list-style: none;

          a {
            text-decoration: none;
            transition: 0.25s ease-in-out;
            padding: 8px 8px;

            &:hover,
            &[aria-current='true'] {
              color: var(--acm-blue);
            }
          }
        }

        .hidden {
          opacity: 0;
        }

        .toggle-container::not(.hidden) {
          opacity: 1;
        }

        .toggle-container {
          display: flex;
          justify-content: flex-end;

          .dark-toggle {
            display: flex;
            align-items: center;
            max-width: fit-content;
            padding: 6px 12px;
            background-color: var(--button-toggle);
            border-radius: 8px;
            gap: 4px;

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
          height: 64px;
        }

        .pages {
          position: fixed;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          top: 0;
          right: 0;
          width: 0;
          background-color: var(--acm-light);
          overflow: hidden;
          z-index: 9;
          transition: 0.25s ease-in-out;

          a {
            justify-content: center;
            font-size: var(--size-lg);
            width: 100%;
            text-align: center;
          }

          li {
            height: 10vh;
          }

          li,
          a {
            width: 100%;
          }
        }
      }

      .toggle-container .dark-toggle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 56px;
        z-index: 8;
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

      & :checked ~ .backdrop {
        opacity: 0.7;
        pointer-events: all;
      }

      & :checked ~ .container {
        .pages {
          width: 60%;
          background-color: var(--acm-light);
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
