import { db } from '$lib/server/db';
import { SurveyTable, UsersTable, agentData, agentSurveysTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Agent } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	async function getData() {
		const [agent] = await db
			.select({
				id: agentData.agentid,
				name: UsersTable.fullname,
				email: agentData.email,
				phone: agentData.phone,
				gender: UsersTable.gender,
				age: UsersTable.age,
				disabled: UsersTable.disabled,
				completes: sql<number>`COALESCE(
            (SELECT COUNT(*)::int 
             FROM ${agentSurveysTable} 
             WHERE ${agentSurveysTable.agentid} = ${agentData.agentid} 
               AND ${agentSurveysTable.survey_completed} = true
            ), 0)`
			})
			.from(agentData)
			.leftJoin(UsersTable, eq(agentData.agentid, UsersTable.id))
			.rightJoin(agentSurveysTable, eq(agentData.agentid, agentSurveysTable.agentid))
			.where(sql`${agentData.agentid} = ${params.agentid}`)
			.groupBy(
				agentData.agentid,
				UsersTable.fullname,
				agentData.email,
				agentData.phone,
				UsersTable.gender,
				UsersTable.age,
				UsersTable.disabled
			);

		const [bi] = await db
			.select({
				pending: sql<number>`count(${agentSurveysTable.surveyid})::int`
			})
			.from(agentSurveysTable)
			.rightJoin(SurveyTable, sql`${agentSurveysTable.surveyid} = ${SurveyTable.surveyid}`)
			.where(sql`
                ${agentSurveysTable.agentid} = ${params.agentid}
                 and 
                ${agentSurveysTable.survey_completed} = false
                 and
                ${SurveyTable.status} = 'Live'
                `);
		const { pending } = bi;
		const data = { agent, pending };

		return data as Agent;
	}

	return await getData();
};
