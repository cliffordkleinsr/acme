import { pgTable, unique, pgEnum, text, varchar, timestamp, foreignKey, uuid } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const questionType = pgEnum("QuestionType", ['Optional', 'Single'])
export const userRole = pgEnum("UserRole", ['RESP', 'CLIENT', 'ADMIN'])


export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	fullname: varchar("fullname", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	userole: userRole("userole").default('RESP').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const userSessions = pgTable("user_sessions", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => users.id),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const surveys = pgTable("surveys", {
	surveyid: uuid("surveyid").defaultRandom().primaryKey().notNull(),
	id: text("id").notNull().references(() => users.id),
	surveyTitle: varchar("survey_title", { length: 255 }).notNull(),
	startDate: varchar("start_date", { length: 255 }).notNull(),
	endDate: varchar("end_date", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const surveyQuestions = pgTable("survey_questions", {
	questionid: uuid("questionid").defaultRandom().primaryKey().notNull(),
	surveyid: uuid("surveyid").notNull().references(() => surveys.surveyid),
	questionType: questionType("question_type").default('Single').notNull(),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	respondentId: text("respondent_id").references(() => users.id),
});

export const clientData = pgTable("client_data", {
	clientId: text("client_id").notNull().references(() => users.id),
	clientEmail: varchar("client_email").notNull().references(() => users.email),
	companyName: varchar("company_name", { length: 255 }).notNull(),
	phone: varchar("phone", { length: 255 }).notNull(),
	county: varchar("county", { length: 255 }).notNull(),
	sector: varchar("sector", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const respondentData = pgTable("respondent_data", {
	respondentId: text("respondent_id").notNull().references(() => users.id),
	respEmail: varchar("resp_email").notNull().references(() => users.email),
	phone: varchar("phone", { length: 255 }).notNull(),
	county: varchar("county", { length: 255 }).notNull(),
	income: varchar("income", { length: 255 }).notNull(),
	employment: varchar("employment", { length: 255 }).notNull(),
	education: varchar("education", { length: 255 }).notNull(),
	sector: varchar("sector", { length: 255 }).notNull(),
	dob: varchar("dob", { length: 255 }).notNull(),
});