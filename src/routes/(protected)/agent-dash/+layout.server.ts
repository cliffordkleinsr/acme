import { redirect } from '@sveltejs/kit';
import { handleExternal, handleLoginRedirect } from '$lib/helperFunctions/helpers';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import {
	agentData,
	agentSurveysTable,
	AnswersTable,
	payoutRequests,
	smsVerification,
	SurveyTable
} from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { deleteCUser } from '$lib/server/db_utils';

export const load: LayoutServerLoad = async ({ locals: { user }, cookies, url }) => {
	const validation = false;
	if (!user) {
		// check external user
		const extrenal = url.searchParams.get('external');
		if (extrenal) {
			redirect(302, handleExternal('/agent/register', url));
		} else {
			redirect(302, handleLoginRedirect('/agent/signin', url));
		}
		// redirect('/respondent/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
	}
	if (validation) {
		const [query] = await db
			.select({
				phone: smsVerification.phone,
				status: smsVerification.verified
			})
			.from(smsVerification)
			.where(eq(smsVerification.userId, user?.id as string));
		if (!query.status) {
			redirect(302, '/agent/verify');
		}
	}
	if (user.role === 'CLIENT') {
		redirect(302, handleLoginRedirect('/', url, 'Not Authorised'));
	}

	return {
		AuthedUser: user.fullname,
		profile: user.pfp,
		url: url.pathname
	};
};
