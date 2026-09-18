<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  let active = -1;
  let isTouch = false;
  let mainDiv: HTMLDivElement;
  let arrowDiv: HTMLDivElement;
  onMount(() => {
    isTouch = 'ontouchstart' in window;
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
  });
  onDestroy(() => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
  });
  function handleCardClick(idx: number) {
    active = idx === active ? -1 : idx;
  }
  function handleClickOutside(event: MouseEvent | TouchEvent) {
    if (!mainDiv?.contains(event.target as Node) && !arrowDiv?.contains(event.target as Node)) {
      active = -1;
    }
  }
  import { base } from '$app/paths';
  let cards = [
    {
      img: base + '/example.jpg',
      alt: 'Example Website 1',
      link: 'https://example.com',
      label: 'Example Website 1'
    },
    {
      img: base + '/example.jpg',
      alt: 'Example Website 2',
      link: 'https://example.com',
      label: 'Example Website 2'
    },
    {
      img: base + '/example.jpg',
      alt: 'Example Website 3',
      link: 'https://example.com',
      label: 'Example Website 3'
    }
  ];
</script>

<div class="main" tabindex="0" bind:this={mainDiv}>
  {#each cards as card, i}
    <div
      class="card"
      id={`c${i+1}`}
      class:active-card={active === i}
      style="z-index: {active === i ? 10 : 3-i};"
    >
      <img src={card.img} alt={card.alt} class="cardlet-img" />
      <span class="card-label">{card.label}</span>
      <a href={card.link} target="_blank" rel="noopener" class="cardlet-btn">Preview</a>
    </div>
  {/each}
</div>
<div class="arrow-controls" bind:this={arrowDiv}>
  <button aria-label="Previous card" on:click={() => active = (active + 2) % 3}>&larr;</button>
  <button aria-label="Next card" on:click={() => active = (active + 1) % 3}>&rarr;</button>
</div>

<style>
.main {
  display: grid;
  height: 50vmax;
  place-items: center;
  position: relative;
  width: 100vw;
  min-height: 260px;
}
/* Cardlet style matches PC */
.card {
  position: absolute;
  width: 90vw;
  max-width: 340px;
  min-width: 0;
  height: 160px;
  background: #18181b;
  border: 1.5px solid #232323;
  border-radius: 1rem;
  box-shadow: 0 6px 32px 0 rgba(0,0,0,0.25);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #fff;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1.2s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1);
  user-select: none;
}
#c1 { background-color: #18181b; }
#c2 { background-color: #2356a8; }
#c3 { background-color: #22c55e; }



/* On card tap/click, bring forward */
.card.active-card {
  transform: translateY(-30px) scale(1.15) !important;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25), 0 0 0 4px #fff3;
  z-index: 10 !important;
}

.cardlet-img {
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 6rem;
  object-fit: cover;
  background: #232323;
  border: 1.5px solid #232323;
}
.card-label {
  pointer-events: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-align: left;
  width: 100%;
  display: block;
}
.cardlet-btn {
  margin-top: 0.5rem;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: #fff;
  color: #18181b;
  font-weight: 600;
  border-radius: 9999px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  text-align: center;
}
.cardlet-btn:hover {
  background: #f3f4f6;
  color: #18181b;
}

@media (max-width: 600px) {
  .main {
    height: 180px;
    min-height: 140px;
  }
  .card {
    width: 90vw;
    max-width: 340px;
    height: 120px;
    font-size: 0.95rem;
    padding: 1rem 0.5rem;
  }
  .card-label {
    font-size: 0.95rem;
  }
}
/* Arrow controls styling */
.arrow-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1.2rem;
}
.arrow-controls button {
  background: #18181b;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.arrow-controls button:active {
  background: #2356a8;
  color: #fff;
  transform: scale(1.1);
}
</style>
