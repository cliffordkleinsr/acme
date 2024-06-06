ALTER TYPE "QuestionType" ADD VALUE 'Multiple';--> statement-breakpoint
ALTER TABLE "survey_questions" ADD COLUMN "option4" text;--> statement-breakpoint
ALTER TABLE "survey_questions" ADD COLUMN "option5" text;--> statement-breakpoint
ALTER TABLE "survey_questions" ADD COLUMN "option6" text;--> statement-breakpoint
ALTER TABLE "survey_questions" ADD COLUMN "option7" text;