import { pgEnum, pgTable, timestamp, uuid, text, serial, boolean, integer, primaryKey, unique  } from "drizzle-orm/pg-core";



// refs
export const UserRole = pgEnum("UserRole", ["ADMIN", "CLIENT", "RESP"])
export const QuestionType = pgEnum("QuestionType", ["Single", "Optional", "Multiple", "Ranking", "Rating", "Likert"])
export const Status = pgEnum("status", ["Draft", "Live", "Closed"])


// Model USERS
export const UsersTable = pgTable('users', {
    id: text("id").primaryKey(),
    fullname: text("fullname").notNull(),
    email: text("email").notNull().unique(),
    isEmailVerified: boolean("is_email_verified").notNull().default(false),
    password: text("password").notNull(),
    role: UserRole("userole").default("RESP").notNull(),
    age: integer("age"),
    gender: text("gender"),
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
    sector: text("sector").notNull(),
    // additional
    total_pts_earned: integer('total_pts_earned').notNull().default(0),
    total_pts_paid: integer('total_pts_paid').notNull().default(0)
})

export const clientData = pgTable('client_data',{
    clientId: text('client_id').references(() => UsersTable.id).notNull(),
    email: text("client_email").references(() => UsersTable.email).notNull(),
    companyName: text("company_name").notNull(),
    phone: text("phone").notNull(),
    county: text("county").notNull(),
    sector: text("sector").notNull(),
    //additional
    packageid: text("packageid"),
    typeid: text("package_type_id"),
    payment_status: boolean('payment_status').notNull().default(false), 
    processed_at: timestamp('processed_at', {
        withTimezone: true,
        mode: "date" 
    }),
    // 
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull()
})

export const clientPackages = pgTable('client_packages', {
    packageid: text("packageid").primaryKey(),
    packageDesc: text("package_description").notNull(),
    package_price: text('package_price').notNull(),
    priceIdMn: text("price_id_monthly"),
    priceIdYr: text("price_id_annual"),
    max_questions: integer('max_qns').notNull().default(1),
    max_surv: integer('max_surveys').notNull().default(1),
    max_agents: integer('max_agents').notNull().default(0),
    demographics: boolean("demographics").notNull().default(false),
    ages: boolean("ages").notNull().default(false)
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
    survey_points: integer("survey_points"),
    target: integer("target"),
    target_age: text("target_age"),
    target_gender: text("target_gender"),
    from: timestamp('from', {
        mode:"date"
    }),
    to: timestamp('to', {
        mode:"date"
    }),
    // answeredby: text("answerd_by"),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull(),

    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull()
})

export const agentSurveysTable = pgTable('agent_surv_table', {
    respondentid: text('respondent_id').references(() => UsersTable.id),
    surveyid: text('surveyid').references(() => SurveyTable.surveyid),
    survey_completed: boolean('survey_completed').notNull().default(false),
    points: integer('points_earned').notNull()
})
// export const SurveyQnsTable = pgTable('survey_questions', {
//     questionId: uuid('questionid').defaultRandom().primaryKey(),
//     surveid: text("surveyid").references(() => SurveyTable.surveyid),
//     questionT: QuestionType("question_type").default("Single").notNull(),
//     question: text("question"),
//     // answer: text("answer"),
//     option1: text("option1"),
//     option2: text("option2"),
//     option3: text("option3"),
//     option4: text("option4"),
//     option5: text("option5"),
//     option6: text("option6"),
//     option7: text("option7"),
//     updatedAt: timestamp('updated_at', {
//         withTimezone: true,
//         mode: "date" 
//     }).defaultNow().notNull()
// })


export const surveyqnsTableV2 = pgTable('survey_qns_optimum', {
    questionId: uuid('questionid').defaultRandom().primaryKey(),
    surveid: text("surveyid").references(() => SurveyTable.surveyid),
    questionT: text("question_type").default("Single").notNull(),
    question: text("question").notNull(),
    likertKey: text("likert_key"),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: "date"
    }).defaultNow().notNull()
});

export const QuestionOptions = pgTable('question_options', {
    optionId: uuid('optionid').defaultRandom().primaryKey().notNull(),
    questionId: uuid('questionid')
        .references(() => surveyqnsTableV2.questionId)
        .notNull(),
    option: text('option').notNull(),
});

export const AnswersTable = pgTable('answers', {
    questionId: uuid('questionid').references(()=> surveyqnsTableV2.questionId).notNull(),
    surveid: text("surveyid").references(() => SurveyTable.surveyid).notNull(),
    optionId: uuid('option_id').references(()=> QuestionOptions.optionId),
    rankId: text("rankid"),
    answer: text("answer").notNull(),
    respondentId: text("respondent_id").references(() => UsersTable.id).notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: "date" 
    }).defaultNow().notNull()
})
export type userInsertSchema = typeof UsersTable.$inferInsert
export type ClientDataInsertSchema = typeof clientData.$inferInsert
export type RespondentInsertSchema = typeof respondentData.$inferInsert
export type surveyGenerateSchema = typeof SurveyTable.$inferInsert
export type surveySelectSchema = typeof SurveyTable.$inferSelect
// export type surveyQnsSchema = typeof SurveyQnsTable.$inferInsert
export type surveyQnsSchemaV2 = typeof surveyqnsTableV2.$inferInsert
export type resData = typeof respondentData.$inferSelect
