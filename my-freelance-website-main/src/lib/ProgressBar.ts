import { navigating } from '$app/stores';
import { onDestroy } from 'svelte';

let progress: HTMLDivElement;
let timeout: NodeJS.Timeout;

$navigating;

$: if ($navigating) {
	if (progress) {
		progress.style.width = '0%';
		progress.style.opacity = '1';
		clearTimeout(timeout);
		setTimeout(() => {
			progress.style.width = '80%';
		}, 10);
	}
} else {
	if (progress) {
		progress.style.width = '100%';
		timeout = setTimeout(() => {
			progress.style.opacity = '0';
			progress.style.width = '0%';
		}, 500);
	}
}

onDestroy(() => clearTimeout(timeout));
