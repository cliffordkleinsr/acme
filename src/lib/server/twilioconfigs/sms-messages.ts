import { client } from '$lib/server/twilio';

export async function createVerification(phoneno: string) {
	const verification = await client.verify.v2
		.services('VAf022beafbd01440725da3c8cbb2cd460')
		.verifications.create({
			channel: 'sms',
			to: phoneno
		});

	return verification.sid;
}

export async function createVerificationCheck(code: string, phoneno: string) {
	const verificationCheck = await client.verify.v2
		.services('VAf022beafbd01440725da3c8cbb2cd460')
		.verificationChecks.create({
			code: code,
			to: phoneno
		});

	return verificationCheck.status;
}
