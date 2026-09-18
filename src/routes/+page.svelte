<script lang="ts">
  import Hero from './components/hero.svelte';
  import Menu from './components/Menu.svelte';
  import { fly } from 'svelte/transition';
  import mainScreenBackground from './assets/mainscreen-bg.png';
  import mobileScreenBackground from './assets/mobilescreen-bg.png';

  // Chat widget loader: only run in the browser and non-blocking
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const module = await import('https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/chatbox/index.js');
        const Chatbox = module.default ?? module.Chatbox ?? module;
        if (!Chatbox || !Chatbox.initBubble) return;

        const widget = await Chatbox.initBubble({
          agentId: 'cmedvnf0803y69jtcp5vbxkiz',

          // optional: provided contact to create/link a contact
          contact: {
            firstName: 'User',
            lastName: 'User',
            email: 'customer@email.com',
            phoneNumber: '+33612345644',
            userId: '42424242',
          },

          // override initial messages
          initialMessages: [
            'Hello Georges how are you doing today?',
            'How can I help you ?'
          ],

          // provided context will be appended to the Agent system prompt
          context: "The user you are talking to is User. Start by Greeting him by his name."
        });

        // open the chat bubble by default
        try { widget.open(); } catch(e) { /* ignore */ }

        // expose for debugging and later control
        (window as any).__chatWidget = widget;
      } catch (err) {
        console.warn('Chatbox load failed', err);
      }
    })();
  }

</script>

<svelte:head>
  <title>LoveuDenji | KaiiDesu</title>
</svelte:head>

<Menu />
<div
  class="main-screen relative min-h-screen w-full bg-black"
  style={`--desktop-background: url('${mainScreenBackground}'); --mobile-background: url('${mobileScreenBackground}')`}
>
  <main class="text-white flex flex-col items-center justify-center pt-24 relative z-10" in:fly={{ y: 60, duration: 700 }}>
    <Hero />
  </main>
</div>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.main-screen {
  background-color: #000;
  background-image: var(--desktop-background);
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
@media (max-width: 600px) {
  .main-screen {
    background-image: var(--mobile-background);
    background-attachment: scroll;
  }
}
/* ensure the chat widget appears over other content when it injects a bubble */
:global(.chaindesk-chatbox, .cdk-chatbox, .chaindesk-embed) {
  /* force the bubble to be fixed at bottom-right and above other widgets */
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  z-index: 2147483647 !important; /* put it on top */
  pointer-events: auto !important;
  transform: none !important; /* avoid stacking-context transforms from library */
}

/* Additional helpers if the embed uses alternate wrapper classes */
:global(.chaindesk-chatbox *, .cdk-chatbox *, .chaindesk-embed *) {
  z-index: inherit !important;
}

</style>
