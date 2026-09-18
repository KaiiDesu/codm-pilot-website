<script lang="ts">
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';
  let homeHref = base + '/';
 
</script>

<svelte:head>
  <title>Contact | KaiiDesu</title>

</svelte:head>

<section class="contact-section">
  <a href={homeHref} class="shadow__btn back-btn" in:fly={{ y: 40, duration: 500, delay: 100 }}>Back to Home</a>
  <div class="contact-header-row">
    <h1 class="contact-title" in:fly={{ y: 40, duration: 500, delay: 200 }}>Contact Me</h1>
    <h1 class="contact-title-pricing" in:fly={{ y: 40, duration: 500, delay: 200 }}>Pricing</h1>
  </div>

  <!-- Two-column grid: left = contact desc + form, right = pricing desc + card -->
  <div class="desc-and-cards">
    <div class="col contact-col">
  <!-- mobile-only title shown inside the column so titles follow the card order on small screens -->
  <h2 class="mobile-title mobile-contact-title" in:fly={{ y: 20, duration: 300 }}>Contact Me</h2>
      <div class="contact-desc-align">
        <p class="contact-desc-form">Let's work together! Fill out the form below or reach out via email.</p>
      </div>

      <form class="contact-form card" in:fly={{ y: 40, duration: 500, delay: 400 }}>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Your Name" required />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Your Email" required />

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>

      <button class="shadow__btn send-btn" type="submit">Send Message</button>
      </form>
    </div>

    <div class="col pricing-col">
  <h2 class="mobile-title mobile-pricing-title" in:fly={{ y: 20, duration: 300 }}>Pricing</h2>
      <div class="pricing-desc-align">
        <p class="pricing-desc">Pricing depends on the project — tell me about your needs via the form or email and I’ll send a tailored, no‑obligation quote.</p>
      </div>

      <div class="pricing-card card" in:fly={{ y: 40, duration: 500, delay: 400 }}>
        <span class="pricing-text">Pricing Information</span>
        <p class="pricing-details">
          For detailed pricing information tailored to your project needs, please reach out via the contact form or email. I offer flexible packages to fit a variety of budgets and requirements. Every project is unique, so I take the time to understand your goals and provide a transparent, no-obligation quote. Let’s work together to find the best solution for you!
        </p>
      </div>
    </div>
  </div>
  <div class="contact-info" in:fly={{ y: 40, duration: 500, delay: 500 }}>
    <p>Email: <a href="mailto:klloydadvincula@gmail.com">klloydadvincula@gmail.com</a></p>
    <p>Or reach out on social media below:</p>
    <div class="contact-socials">
      <a href="https://www.facebook.com/kaiirodesuu/" aria-label="Facebook">Facebook</a>
      <a href="https://github.com/KaiiDesu" aria-label="GitHub">GitHub</a>
    </div>
  </div>
</section>

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

.contact-header-row {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 0.75rem auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 400px));
  gap: 2rem;
  align-items: end;
  justify-content: center;
}
.contact-title,
.contact-title-pricing {
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  padding: 0.25rem 0;
  /* align titles with card content by matching the card inner padding */
  padding-left: 2.25rem;
}
.contact-title { text-align: left; }
.contact-title-pricing { text-align: left; }

.desc-and-cards {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 1rem auto;
  display: grid;
  grid-template-columns: 400px 400px;
  gap: 2rem;
  align-items: start;
  justify-content: center;
}
.col { display:flex; flex-direction:column; gap:1rem; }
.contact-desc-form, .pricing-desc { color: #d1d5db; }
.contact-desc-form { text-align:left; padding-left: 2.25rem; }
.pricing-desc { text-align:left; padding-left: 2.25rem; }

.card {
  background: rgba(255,255,255,0.06);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2rem 2.25rem;
  display:flex;
  flex-direction:column;
  gap: 1rem;
}

/* CONTACT FORM (restored compact look) */
.contact-form.card {
  width:100%;
  max-width:400px;
  min-width:260px;
  padding-bottom:2.5rem; /* room for button */
}
.contact-form label { font-weight:600; margin-bottom:0.5rem; }
.contact-form input,
.contact-form textarea {
  padding:0.9rem 1.25rem;
  border-radius:0.75rem;
  border:none;
  background:#1f1f21;
  color:#fff;
  font-size:1rem;
  margin-bottom:1rem;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.45);
}
.contact-form textarea { min-height:140px; resize:vertical; }
.contact-form input:focus, .contact-form textarea:focus { outline:2px solid #008cff; background:#232a3d; }

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

.send-btn {
  margin-top:1rem;
  width:100%;
  padding:14px 20px;
  border-radius:10px;
  font-size:14px;
  letter-spacing:6px;
  background: linear-gradient(180deg,#00a5ff,#0077d9);
  color:#fff;
  border:none;
  box-shadow: 0 10px 36px rgba(0,140,255,0.9);
  text-transform:uppercase;
}

/* PRICING CARD (keep the halo) */
.pricing-card::after{
  content:''; position:absolute; inset:6px; border-radius:1rem; z-index:-1; background:rgba(255,255,255,0.03);
}
.pricing-text{ font-size:1.25rem; font-weight:600; margin-bottom:0.5rem; }
.pricing-details{ color:#fff; opacity:0.95; line-height:1.6; }

.contact-info{ text-align:center; color:#d1d5db; margin-top:2rem; }
.contact-socials{ display:flex; gap:1rem; justify-content:center; margin-top:0.5rem }
.contact-socials a{ background:#232323; padding:.5rem 1rem; border-radius:9999px; color:#fff; text-decoration:none }

@media (max-width:900px){
  .contact-header-row{ grid-template-columns:1fr; text-align:center }
  .desc-and-cards{ grid-template-columns:1fr; max-width:98vw }
  .contact-title-pricing{ text-align:center }
}

/* Mobile: stack content, increase touch targets, pricing below the form */
@media (max-width:700px) {
  .contact-section { padding-top: 1rem; padding-bottom: 1.5rem; }
  /* put pricing title above contact title on mobile */
  .contact-header-row { gap: 0.5rem; margin-bottom: 0.5rem; display:flex; flex-direction:column-reverse; align-items:center }
  .contact-title, .contact-title-pricing { font-size: 1.4rem; }
  .contact-desc-form, .pricing-desc { padding-left: 0; text-align: center; }
  .desc-and-cards { grid-template-columns: 1fr; gap: 1rem; max-width: 96vw; margin: 0 auto 1rem auto; }
  .contact-form.card, .pricing-card.card { max-width: 100%; width: 100%; margin: 0 auto; }
  .contact-form.card { padding: 1.25rem; }
  .pricing-card.card { padding: 1.25rem; }
  .contact-form input, .contact-form textarea { padding: 0.85rem 1rem; font-size: 1rem; }
  .send-btn { padding: 14px; font-size: 15px; }

  /* Place pricing above the form on mobile */
  .pricing-col { order: 1; }
  .contact-col { order: 2; }

  /* Slightly reduce halo on mobile to save space/contrast */
  .pricing-card::before { filter: blur(12px); opacity: 0.35; }

  /* Back button smaller and aligned left */
  .back-btn { margin-left: 0.75rem; padding: 8px 14px; font-size: 13px; }
  /* hide desktop header and use mobile column titles instead */
  .contact-header-row { display: none; }
  .mobile-title { display: block; text-align: center; font-size: 1.2rem; font-weight:800; text-transform:uppercase; margin: 0.5rem 0; }
  .mobile-pricing-title { margin-top: 0.25rem; }
  .mobile-contact-title { display: block; }
}

</style>