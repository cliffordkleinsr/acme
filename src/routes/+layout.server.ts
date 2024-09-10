import { flashCookieOptions, loadFlash } from 'sveltekit-flash-message/server'
import type { LayoutServerLoad } from './$types';
import { lucia } from '$lib/server/auth';


flashCookieOptions.secure = false;
export const load: LayoutServerLoad = loadFlash(async () => {
    await lucia.deleteExpiredSessions()
})