<script lang="ts">
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import loadingGif from '../assets/codm-loading.gif';
  import discordLogo from '../assets/discord_logo.png';
  import facebookLogo from '../assets/facebook_logo.png';
  let homeHref = base + '/';
  let isLoadingHome = false;

  function goHome() {
    if (isLoadingHome) return;

    isLoadingHome = true;
    setTimeout(() => {
      goto(homeHref);
    }, 4500);
  }

</script>

<svelte:head>
  <title>Pricing | KaiiDesu</title>

</svelte:head>

<section class="contact-section">
  <a href={homeHref} class="shadow__btn back-btn" data-no-delay on:click|preventDefault={goHome} in:fly={{ y: 40, duration: 500, delay: 100 }}>Back to Home</a>
  <h1 class="pricing-title" in:fly={{ y: 40, duration: 500, delay: 200 }}>Pricing</h1>

  <!-- Pricing content -->
  <div class="desc-and-cards">
    <div class="col pricing-col">
      <div class="pricing-card card" in:fly={{ y: 40, duration: 500, delay: 400 }}>
        <span class="pricing-text">Pricing Information</span>
        <p>Leaderboard Pilot Services:</p>
        <div class="pricing-row-leaderboard">
          <span>Legendary &rarr; Legendary Top 5000</span>
          <strong>₱250</strong>
        </div>
        <p>Rush Services:</p>
        <div class="pricing-list">
          <div class="pricing-row">
            <span>Rookie &rarr; Pro</span>
            <strong>₱100</strong>
          </div>
          <div class="pricing-row">
            <span>Pro &rarr; Master</span>
            <strong>₱120</strong>
          </div>
          <div class="pricing-row">
            <span>Grandmaster &rarr; Legendary</span>
            <strong>₱190</strong>
          </div>
        <p>Standard Pilot Services:</p>
          <div class="pricing-row">
            <span>Rookie &rarr; Pro</span>
            <strong>₱70</strong>
          </div>
          <div class="pricing-row">
            <span>Pro &rarr; Master</span>
            <strong>₱100</strong>
          </div>
          <div class="pricing-row">
            <span>Master &rarr; Grandmaster</span>
            <strong>₱120</strong>
          </div>
          <div class="pricing-row">
            <span>Grandmaster &rarr; Legendary</span>
            <strong>₱140</strong>
          </div>
        
        </div>
        <p class="services-link-text">
          See the difference of
          <a href={base + '/pilot-services/'}>Rush Pilot and Standard Pilot Services</a>
        </p>
      </div>
    </div>
  </div>
  <div class="contact-info" in:fly={{ y: 40, duration: 500, delay: 500 }}>
    <div class="contact-socials">
      <a href="https://www.facebook.com/profile.php?id=61589081225928" class="social-logo-link" target="_blank" rel="noreferrer" aria-label="Open Facebook">
        <span class="social-logo-slot">
          <img src={facebookLogo} alt="Facebook logo" />
        </span>
      </a>
      <a href="https://discord.com/users/1393580083230539786" class="social-logo-link" target="_blank" rel="noreferrer" aria-label="Open Discord">
        <span class="social-logo-slot">
          <img src={discordLogo} alt="Discord logo" />
        </span>
      </a>
    </div>
  </div>
</section>

{#if isLoadingHome}
  <div class="loading-overlay" role="status" aria-live="polite" aria-label="Loading home page">
    <img src={loadingGif} alt="Loading" class="loading-gif" />
  </div>
{/if}

<style>
/* small, focused stylesheet for contact page */

/* Layout */
.contact-section {
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.25rem;
  padding-bottom: 2rem;
  background: #18181b;
  color: #fff;
}
.back-btn {
  align-self: flex-start;
  margin: 0 0 1rem 1.25rem;
  position: relative;
  z-index: 3; /* keep above headings */
}

.pricing-title {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 0.75rem;
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.25rem 0;
  padding-left: 2.25rem;
  text-align: left;
}

.desc-and-cards {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 1rem auto;
}
.col { display:flex; flex-direction:column; gap:1rem; }

.card {
  background: rgba(255,255,255,0.06);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2rem 2.25rem;
  display:flex;
  flex-direction:column;
  gap: 1rem;
}

.shadow__btn {
  padding: 10px 20px;
  border: none;
  font-size: 17px;
  color: #fff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  transition-property: box-shadow;
  background: rgb(0,140,255);
  box-shadow: 0 0 25px rgb(0,140,255);
}
.shadow__btn:hover {
  box-shadow: 0 0 5px rgb(0,140,255),
              0 0 25px rgb(0,140,255),
              0 0 50px rgb(0,140,255),
              0 0 100px rgb(0,140,255);
}

/* PRICING CARD (keep the halo) */
.pricing-card::after{
  content:''; position:absolute; inset:6px; border-radius:1rem; z-index:-1; background:rgba(255,255,255,0.03);
}
.pricing-text{ font-size:1.25rem; font-weight:600; margin-bottom:0.5rem; }
.pricing-list{ display:flex; flex-direction:column; gap:0.75rem; }
.pricing-row{ display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:0.85rem 1rem; border-radius:0.75rem; background:rgba(255,255,255,0.07); color:#fff; }
.pricing-row strong{ color:#ffd21f; font-size:1.25rem; white-space:nowrap; }
.pricing-row-leaderboard{ position:relative; isolation:isolate; overflow:hidden; display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:0.85rem 1rem; border-radius:0.75rem; background:rgba(0,207,255,0.06); color:#fff; box-shadow:0 0 8px rgba(0,207,255,0.7), 0 0 22px rgba(255,0,128,0.35); }
.pricing-row-leaderboard::before{ content:''; position:absolute; inset:-2px; z-index:-2; border-radius:0.85rem; background:linear-gradient(90deg, #ff0080, #ff7a00, #ffd21f, #00ff95, #00cfff, #7928ca, #ff0080); background-size:300% 100%; animation:leaderboard-rainbow-flow 4s linear infinite; }
.pricing-row-leaderboard::after{ content:''; position:absolute; inset:2px; z-index:-1; border-radius:0.6rem; background:#25262a; box-shadow:inset 0 0 14px rgba(0,207,255,0.18); }
.pricing-row-leaderboard span{ position:relative; z-index:1; flex:1 1 auto; min-width:0; color:#fff; line-height:1.35; }
.pricing-row-leaderboard strong{ position:relative; z-index:1; flex:0 0 auto; color:#ffd21f; font-size:1.25rem; white-space:nowrap; }
@keyframes leaderboard-rainbow-flow{ 0%{ background-position:0% 50%; } 100%{ background-position:300% 50%; } }
.services-link-text a{ color:#008cff; text-decoration:underline; text-underline-offset:0.2em; }
.services-link-text a:hover,
.services-link-text a:focus-visible{ color:#66c2ff; }

.contact-info{ text-align:center; color:#d1d5db; margin-top:2rem; }
.contact-socials{ display:flex; gap:1rem; justify-content:center; margin-top:0.5rem; }
.social-logo-link{ display:flex; align-items:center; justify-content:center; padding:0.5rem; border-radius:1rem; }
.social-logo-slot{ width:72px; height:72px; display:block; border-radius:1rem; background:#232323; transition: box-shadow 0.2s; }
.social-logo-link:hover .social-logo-slot,
.social-logo-link:focus-visible .social-logo-slot{ box-shadow:0 0 20px rgba(0,140,255,0.65); }
.social-logo-slot :global(img){ width:100%; height:100%; display:block; object-fit:contain; border-radius:0.85rem; }
.loading-overlay{ position:fixed; inset:0; z-index:60; display:grid; place-items:center; background:#000; }
.loading-gif{ width:min(60vw, 20rem); max-height:60vh; object-fit:contain; }

/* Mobile: stack content and increase touch targets */
@media (max-width:700px) {
  .contact-section { padding-top: 1rem; padding-bottom: 1.5rem; }
  .pricing-title { font-size: 1.4rem; padding-left: 1.25rem; }
  .desc-and-cards { max-width: 96vw; }
  .pricing-card.card { max-width: 100%; width: 100%; margin: 0 auto; }
  .pricing-card.card { padding: 1.25rem; }

  /* Slightly reduce halo on mobile to save space/contrast */
  .pricing-card::before { filter: blur(12px); opacity: 0.35; }

  /* Back button smaller and aligned left */
  .back-btn { margin-left: 0.75rem; padding: 8px 14px; font-size: 13px; }
  .social-logo-slot { width:64px; height:64px; }
}

</style>