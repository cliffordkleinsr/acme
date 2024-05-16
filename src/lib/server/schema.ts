import { pgEnum, pgTable, varchar, timestamp, uuid, text, serial, boolean  } from "drizzle-orm/pg-core";



// refs
export const UserRole = pgEnum("UserRole", ["ADMIN", "CLIENT", "RESP"])
export const QuestionType = pgEnum("QuestionType", ["Single", "Optional"])
export const Status = pgEnum("status", ["Draft", "Live", "Closed"])


// Model USERS
export const UsersTable = pgTable('users', {
    id: text("id").primaryKey(),
    fullname: text("fullname").notNull(),
    email: text("email").notNull().unique(),
    isEmailVerified: boolean("is_email_verified").notNull().default(false),
    password: text("password").notNull(),
    role: UserRole("userole").default("RESP").notNull(),

    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow()
})


export const respondentData = pgTable('respondent_data',{
    respondentId: text('respondent_id').references(() => UsersTable.id).notNull(),
    email: text("resp_email").references(() => UsersTable.email).notNull(),
    phone: text("phone").notNull(),
    dateofbirth: text("dob").notNull(),
    county: text("county").notNull(),
    income: text("income").notNull(),
    employment: text("employment").notNull(),
    education: text("education").notNull(),
    sector: text("sector").notNull()

})

export const clientData = pgTable('client_data',{
    clientId: text('client_id').references(() => UsersTable.id).notNull(),
    email: text("client_email").references(() => UsersTable.email).notNull(),
    companyName: text("company_name").notNull(),
    phone: text("phone").notNull(),
    county: text("county").notNull(),
    sector: text("sector").notNull(),

    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull()
})

export const emailVerificationCodes = pgTable("email_verification_codes",{
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().references(() => UsersTable.id),
    code: text('code').notNull(),
    email: text('email').notNull(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
})

export const sessionsTable = pgTable("user_sessions", {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => UsersTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
})


// Surveys
export const SurveyTable = pgTable('surveys', {
    surveyid: text('surveyid').primaryKey(),
    clientid: text('id').notNull(),
    surveyTitle: text('survey_title').notNull(),
    surveyDescription: text('survey_desc').notNull(),
    status: Status("status").default("Draft").notNull(),
    from: timestamp('from', {
        mode:"date"
    }),
    to: timestamp('to', {
        mode:"date"
    }),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull(),

    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull()
})

export const SurveyQnsTable = pgTable('survey_questions', {
    questionId: uuid('questionid').defaultRandom().primaryKey(),
    surveid: text("surveyid").references(() => SurveyTable.surveyid).notNull(),
    questionT: QuestionType("question_type").default("Single").notNull(),
    question: text("question"),
    answer: text("answer"),
    option1: text("option1"),
    option2: text("option2"),
    option3: text("option3"),
    respondentId: text("respondent_id").references(() => UsersTable.id)
})

export type userInsertSchema = typeof UsersTable.$inferInsert
export type ClientDataInsertSchema = typeof clientData.$inferInsert
export type RespondentInsertSchema = typeof respondentData.$inferInsert
export type surveyGenerateSchema = typeof SurveyTable.$inferInsert
export type surveySelectSchema = typeof SurveyTable.$inferSelect
export type surveyQnsSchema = typeof SurveyQnsTable.$inferInsert