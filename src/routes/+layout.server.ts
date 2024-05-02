import { flashCookieOptions, loadFlash } from 'sveltekit-flash-message/server'
import type { LayoutServerLoad } from './$types';

flashCookieOptions.secure = false;
export const load: LayoutServerLoad = loadFlash(async () => {
    
})