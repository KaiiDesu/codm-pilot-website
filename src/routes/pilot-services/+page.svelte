<script lang="ts">
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Pilot Services | KaiiDesu</title>
</svelte:head>

<section class="services-page">
  <a href={base + '/contact'} class="back-link" in:fly={{ y: 30, duration: 400 }}>Back to Pricing</a>
  <h1 in:fly={{ y: 30, duration: 400, delay: 100 }}>Rush Pilot and Standard Pilot Services</h1>

  <div class="services-grid">
    <article class="service-card" in:fly={{ y: 30, duration: 400, delay: 200 }}>
      <h2>Rush Pilot</h2>
      <p>Priority rank pushing for clients who want faster service.</p>
    </article>
    <article class="service-card" in:fly={{ y: 30, duration: 400, delay: 300 }}>
      <h2>Standard Pilot</h2>
      <p>Reliable rank pushing with the standard service schedule.</p>
    </article>
  </div>
</section>

<style>
  .services-page {
    min-height: 100vh;
    padding: 1.25rem 1.25rem 3rem;
    background: #18181b;
    color: #fff;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: #fff;
    text-decoration: none;
  }

  h1 {
    max-width: 800px;
    margin: 0 auto 2rem;
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    text-align: center;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .service-card {
    padding: 1.5rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.07);
  }

  .service-card h2 { margin-top: 0; }
  .service-card p { color: #d1d5db; line-height: 1.6; }

  @media (max-width: 600px) {
    .services-grid { grid-template-columns: 1fr; }
  }
</style>