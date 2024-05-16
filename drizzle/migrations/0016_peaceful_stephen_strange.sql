DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Draft', 'Live', 'Closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "surveys" ADD COLUMN "status" "status" DEFAULT 'Draft' NOT NULL;