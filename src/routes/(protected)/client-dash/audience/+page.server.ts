import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable, respondentData } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { getCountAgents } from '$lib/server/db_utils';

export const load: PageServerLoad = async ({locals}) => {
  const user = locals.session?.userId!
  const by_cty = await getCountAgents(respondentData.county, user)
  const by_sec= await getCountAgents(respondentData.sector, user)
  const by_age = await getCountAgents(respondentData.dateofbirth, user)

  return {
    by_cty,
    by_sec,
    by_age
  }
}