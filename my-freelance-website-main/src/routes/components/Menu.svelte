<script lang="ts">
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  export let menuItems = [
    { name: 'Contact', href: base + '/contact' }
  ];
  let mobileOpen = false;
  function toggleMobile() { mobileOpen = !mobileOpen; }
</script>

<nav class="menu-bar" in:fly={{ y: -60, duration: 700 }}>
  <div class="menu-brand">KaiiDesu | Call of Du</div>
  <button class="menu-mobile-btn" aria-label="Open menu" on:click={toggleMobile}>
    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
  </button>
  <ul class="menu-list {mobileOpen ? 'open' : ''}">
    {#each menuItems as item}
      <li>
        <a
          href={item.href}
          class="menu-link"
          on:click={() => { mobileOpen = false; }}
        >
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
/* Desktop styles */
.menu-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #000;
  background: rgba(0,0,0,0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  border-bottom: 2px solid #fff;
}
.menu-brand {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #fff;
}
.menu-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.menu-link {
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.01em;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  transition: color 0.2s;
  text-decoration: none;
}
.menu-link:hover {
  color: #9ca3af;
}
.menu-mobile-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
}
@media (max-width: 800px) {
  .menu-bar {
    padding: 0.75rem 1rem;
  }
  .menu-list {
    gap: 1.2rem;
  }
  .menu-brand {
    font-size: 1.1rem;
  }
}
@media (max-width: 600px) {
  .menu-bar {
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
  }
  .menu-mobile-btn {
    display: block;
    color: #fff;
    z-index: 60;
  }
  .menu-list {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    background: #18181b;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    display: none;
  }
  .menu-list.open {
    display: flex;
  }
}
</style>
