import { pgTable, foreignKey, pgEnum, uuid, text, timestamp, serial, integer, unique, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const QuestionType = pgEnum("QuestionType", ['Single', 'Optional', 'Multiple', 'Ranking'])
export const UserRole = pgEnum("UserRole", ['ADMIN', 'CLIENT', 'RESP'])
export const status = pgEnum("status", ['Draft', 'Live', 'Closed'])


export const answers_version2 = pgTable("answers_version2", {
	questionid: uuid("questionid").notNull().references(() => survey_qns_version2.questionid),
	surveyid: text("surveyid").notNull(),
	optionid: text("optionid").notNull(),
	answer: text("answer").notNull(),
	respondent_id: text("respondent_id").notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const answers = pgTable("answers", {
	questionid: uuid("questionid").references(() => survey_questions.questionid),
	surveyid: text("surveyid").notNull().references(() => surveys.surveyid),
	answer: text("answer"),
	respondent_id: text("respondent_id").references(() => users.id),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	optionid: uuid("optionid").notNull(),
});

export const survey_qns_version2 = pgTable("survey_qns_version2", {
	questionid: uuid("questionid").defaultRandom().primaryKey().notNull(),
	surveyid: text("surveyid").notNull().references(() => surveys.surveyid),
	question_type: QuestionType("question_type").default('Single').notNull(),
	question: text("question").notNull(),
	optionid: text("optionid").notNull(),
	option: text("option").notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const email_verification_codes = pgTable("email_verification_codes", {
	id: serial("id").primaryKey().notNull(),
	user_id: text("user_id").notNull().references(() => users.id),
	code: text("code").notNull(),
	email: text("email").notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const survey_questions = pgTable("survey_questions", {
	questionid: uuid("questionid").defaultRandom().primaryKey().notNull(),
	surveyid: text("surveyid").notNull().references(() => surveys.surveyid),
	question_type: QuestionType("question_type").default('Single').notNull(),
	question: text("question"),
	option1: text("option1"),
	option2: text("option2"),
	option3: text("option3"),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	option4: text("option4"),
	option5: text("option5"),
	option6: text("option6"),
	option7: text("option7"),
});

export const surveys = pgTable("surveys", {
	surveyid: text("surveyid").primaryKey().notNull(),
	id: text("id").notNull(),
	survey_title: text("survey_title").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	survey_desc: text("survey_desc").notNull(),
	from: timestamp("from", { mode: 'string' }),
	to: timestamp("to", { mode: 'string' }),
	status: status("status").default('Draft').notNull(),
	target: integer("target"),
});

export const user_sessions = pgTable("user_sessions", {
	id: text("id").primaryKey().notNull(),
	user_id: text("user_id").notNull().references(() => users.id),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const client_data = pgTable("client_data", {
	client_id: text("client_id").notNull().references(() => users.id),
	client_email: text("client_email").notNull().references(() => users.email),
	company_name: text("company_name").notNull(),
	phone: text("phone").notNull(),
	county: text("county").notNull(),
	sector: text("sector").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const respondent_data = pgTable("respondent_data", {
	respondent_id: text("respondent_id").notNull().references(() => users.id),
	resp_email: text("resp_email").notNull().references(() => users.email),
	phone: text("phone").notNull(),
	county: text("county").notNull(),
	income: text("income").notNull(),
	employment: text("employment").notNull(),
	education: text("education").notNull(),
	sector: text("sector").notNull(),
	dob: text("dob").notNull(),
});

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	fullname: text("fullname").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	userole: UserRole("userole").default('RESP').notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	is_email_verified: boolean("is_email_verified").default(false).notNull(),
},
(table) => {
	return {
		users_email_unique: unique("users_email_unique").on(table.email),
	}
});