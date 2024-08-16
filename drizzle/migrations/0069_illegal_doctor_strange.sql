ALTER TABLE "surveys" ADD COLUMN "extern" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "agent_surv_table" ADD COLUMN "ext_agent" boolean DEFAULT false;