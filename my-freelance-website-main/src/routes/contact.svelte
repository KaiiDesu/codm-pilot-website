<script lang="ts">
  import { fade, slide } from 'svelte/transition';

</script>

<section class="contact-section" in:fade={{ duration: 600 }} in:slide={{ duration: 600 }}>
  <h1 class="contact-title">Contact Me</h1>
  <p class="contact-desc">Let's work together! Fill out the form below or reach out via email.</p>
  <form class="contact-form">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Your Name" required />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Your Email" required />

    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>

    <button class="shadow__btn" type="submit">Send Message</button>
  </form>
  <div class="contact-info">
    <p>Email: <a href="mailto:your@email.com">your@email.com</a></p>
    <p>Or reach out on social media below:</p>
    <div class="contact-socials">
      <!-- Add your social icons/links here -->
      <a href="#" aria-label="Twitter">Twitter</a>
      <a href="#" aria-label="LinkedIn">LinkedIn</a>
      <a href="#" aria-label="GitHub">GitHub</a>
    </div>
  </div>
</section>

<style>
.contact-section {
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 6rem;
  padding-bottom: 6rem;
  background: #18181b;
  color: #fff;
}
.contact-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
}
.contact-desc {
  font-size: 1.125rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  text-align: center;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: rgba(255,255,255,0.08);
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  width: 100%;
  max-width: 420px;
  margin-bottom: 2.5rem;
}
.contact-form label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.contact-form input,
.contact-form textarea {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #232323;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.contact-form input:focus,
.contact-form textarea:focus {
  outline: 2px solid #008cff;
  background: #232a3d;
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
.contact-info {
  text-align: center;
  color: #d1d5db;
}
.contact-info a {
  color: #008cff;
  text-decoration: underline;
}
.contact-socials {
  margin-top: 0.5rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}
.contact-socials a {
  color: #fff;
  background: #232323;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}
.contact-socials a:hover {
  background: #008cff;
  color: #fff;
}
</style>
