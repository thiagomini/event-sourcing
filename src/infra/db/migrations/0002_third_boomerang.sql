ALTER TABLE "events" DROP CONSTRAINT "events_stream_id_version_unique";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "version";--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_stream_id_unique" UNIQUE("stream_id");