CREATE TABLE IF NOT EXISTS "email_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"code" text NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "survey_title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "start_date" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "end_date" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "fullname" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "client_data" ALTER COLUMN "client_email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "client_data" ALTER COLUMN "company_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "client_data" ALTER COLUMN "phone" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "client_data" ALTER COLUMN "county" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "client_data" ALTER COLUMN "sector" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "resp_email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "phone" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "county" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "income" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "employment" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "education" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "respondent_data" ALTER COLUMN "sector" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "respondent_data" ADD COLUMN "dob" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_verification_codes" ADD CONSTRAINT "email_verification_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
