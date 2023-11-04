CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"stream_id" varchar NOT NULL,
	"version" bigint NOT NULL,
	"data" jsonb NOT NULL,
	CONSTRAINT "events_stream_id_version_unique" UNIQUE("stream_id","version")
);
