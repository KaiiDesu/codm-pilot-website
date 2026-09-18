
<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { goto as svelteGoto } from '$app/navigation';
	let { children } = $props();


	let progressBar: HTMLDivElement;
	let timeout: ReturnType<typeof setTimeout>;
	let navigationStart = 0;
	const MIN_DISPLAY_TIME = 800;
	let isDelaying = false;

	
	export async function goto(href: string, opts?: any) {
		if (isDelaying) return;
		isDelaying = true;
		navigationStart = Date.now();
		if (progressBar) {
			progressBar.style.width = '0%';
			progressBar.style.opacity = '1';
			clearTimeout(timeout);
			setTimeout(() => {
				progressBar.style.width = '80%';
			}, 50);
		}
		await new Promise((resolve) => setTimeout(resolve, MIN_DISPLAY_TIME));
		await svelteGoto(href, opts);
		isDelaying = false;
	}

	
	if (typeof window !== 'undefined') {
		let handler: any = null;
		handler = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target && target.closest) {
				const link = target.closest('a[href]');
				if (link && link.getAttribute('target') !== '_blank' && !link.hasAttribute('data-no-delay')) {
					const href = link.getAttribute('href');
					if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
						e.preventDefault();
						goto(href);
					}
				}
			}
		};
		window.addEventListener('click', handler, true);
		onDestroy(() => window.removeEventListener('click', handler, true));
	}

	$effect(() => {
		if ($navigating) {
			navigationStart = Date.now();
			if (progressBar) {
				progressBar.style.width = '0%';
				progressBar.style.opacity = '1';
				clearTimeout(timeout);
				setTimeout(() => {
					progressBar.style.width = '80%';
				}, 50);
			}
		} else {
			const elapsed = Date.now() - navigationStart;
			const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);
			if (progressBar) {
				progressBar.style.width = '100%';
				timeout = setTimeout(() => {
					progressBar.style.opacity = '0';
					progressBar.style.width = '0%';
				}, 400 + remaining);
			}
		}
	});

	onDestroy(() => clearTimeout(timeout));
</script>


<svelte:head>
</svelte:head>

<div bind:this={progressBar} class="progress-bar"></div>

{@render children?.()}

<style>
.progress-bar {
	position: fixed;
	top: 0;
	left: 0;
	height: 3px;
	width: 0%;
	background: linear-gradient(90deg, #00cfff, #008cff 60%, #2356a8 100%);
	opacity: 0;
	z-index: 9999;
	transition: width 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s;
	pointer-events: none;
}
</style>
