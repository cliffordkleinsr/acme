<script>
	import { ModeWatcher } from "mode-watcher"
	import "@uploadthing/svelte/styles.css";
    import "../app.pcss"
	import { toast } from 'svelte-sonner';
	import { Toaster } from "$lib/components/ui/sonner"
	import { getFlash } from 'sveltekit-flash-message'
  	import { page } from '$app/stores'

	const flash = getFlash(page)

	$: if ($flash) {
		switch($flash.type) {
			case "success":
				toast.success($flash.message)
				break
			case "error":
				toast.error($flash.message)
				break
			case "warning":
				toast.warning($flash.message)
				break
		}
		$flash = undefined
	}
	// console.log($flash)
	
	// console.log($flash?.type)
</script>

<Toaster position="top-right" richColors />
<ModeWatcher />
<slot/>