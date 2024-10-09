import { createVerification } from '$lib/server/twilioconfigs/sms-messages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const phone = atob(params.phoneno) as string;
		await createVerification(phone);
		let heading = 'OTP message sent';
		let message = ' A new verification otp was sent. Please check your Phone for the message.';

		return {
			heading,
			message
		};
	} catch (err) {
		console.error(err);
	}
};
