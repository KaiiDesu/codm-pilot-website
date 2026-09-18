<script lang="ts">
  import Hero from './components/hero.svelte';
  import About from './components/about.svelte';
  import Menu from './components/Menu.svelte';
  import SciFiBackground from './components/SciFiBackground.svelte';
  import CardletMobile from './components/CardletMobile.svelte';
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';

  
  let isMobile = false;
  let exampleImg = base + '/example.jpg';

  if (typeof window !== 'undefined') {
    const checkMobile = () => isMobile = window.innerWidth <= 600;
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }

  
  function scrollFade(node: HTMLElement, params = { delay: 0 }) {
    let timeout;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => {
            node.classList.add('cardlet-visible');
            node.classList.remove('cardlet-hidden');
          }, params.delay || 0);
        } else {
          clearTimeout(timeout);
          node.classList.remove('cardlet-visible');
          node.classList.add('cardlet-hidden');
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.15
    });
    observer.observe(node);
    return {
      update(newParams) {
        params = newParams;
      },
      destroy() {
        observer.disconnect();
        clearTimeout(timeout);
      }
    };
  }
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
  <title>Homepage | KaiiDesu</title>
</svelte:head>

<Menu />
<div class="relative min-h-screen w-full bg-black">
  <SciFiBackground />
  <main class="text-white flex flex-col items-center justify-center pt-24 relative z-10" in:fly={{ y: 60, duration: 700 }}>
    <Hero />
    <About />
    {#if isMobile}
      <CardletMobile />
    {:else}
      <div class="cardlet-container">
        <div class="cardlet-grid">
          <div class="cardlet cardlet-hidden" use:scrollFade={{delay: 0}}>
            <img src={exampleImg} alt="Example Website 1" class="cardlet-img" />
            <a href="https://example.com" target="_blank" rel="noopener" class="cardlet-btn">Preview</a>
          </div>
          <div class="cardlet cardlet-hidden" use:scrollFade={{delay: 350}}>
            <img src={exampleImg} alt="Example Website 2" class="cardlet-img" />
            <a href="https://example.com" target="_blank" rel="noopener" class="cardlet-btn">Preview</a>
          </div>
          <div class="cardlet cardlet-hidden" use:scrollFade={{delay: 700}}>
            <img src={exampleImg} alt="Example Website 3" class="cardlet-img" />
            <a href="https://example.com" target="_blank" rel="noopener" class="cardlet-btn">Preview</a>
          </div>
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.cardlet-container {
  background: rgba(255,255,255,0.8);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10);
  padding: 2.5rem 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 1200rem;
  overflow-x: hidden;
}
.cardlet-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  min-width: 0;
  justify-items: center;
}
.cardlet {
  background: #18181b;
  border: 1.5px solid #232323;
  border-radius: 1rem;
  box-shadow: 0 6px 32px 0 rgba(0,0,0,0.25);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1.2s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1);
}
.cardlet:hover {
  transform: translateY(-18px) scale(1.07) rotate(-2deg);
  box-shadow:
    0 0 24px 4px #2356a8,
    0 0 12px 0 rgba(35,86,168,0.18),
    0 0 2px 0 #3a4e7c;
  filter: brightness(1.03) saturate(1.06) drop-shadow(0 0 6px #2356a8);
  z-index: 3;
}
.cardlet-hidden {
  opacity: 0;
  transform: translateY(60px);
  pointer-events: none;
}
.cardlet-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.cardlet-img {
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 10rem;
  object-fit: cover;
  background: #232323;
  border: 1.5px solid #232323;
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
}
.cardlet-btn:hover {
  background: #f3f4f6;
  color: #18181b;
}
/* Responsive Styling */
@media (max-width: 900px) {
  .cardlet-grid {
    gap: 1.2rem;
  }
  .cardlet {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
  .cardlet-img {
    height: 5.5rem;
  }
  .cardlet-container {
    padding: 1.5rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .cardlet-container {
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
    padding: 0.5rem 0.1rem;
  }
  .cardlet-grid {
    gap: 0.3rem;
    width: 100%;
    min-width: 0;
    grid-template-columns: repeat(3, 1fr);
  }
  .cardlet {
    width: 100%;
    max-width: 200px;
    min-width: 0;
    padding: 0.3rem;
    font-size: 0.8rem;
    max-height: 200px;
  }
  .cardlet-img {
    height: 2.8rem;
    margin-bottom: 0.3rem;
  }
  .cardlet-btn {
    padding: 0.3rem 0.7rem;
    font-size: 0.85rem;
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
