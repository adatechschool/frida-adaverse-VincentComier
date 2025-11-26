CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects-details" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"github" text NOT NULL,
	"demolink" text NOT NULL,
	"thumbnail" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"git_username_id" integer NOT NULL,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"git_username" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects-details" ADD CONSTRAINT "projects-details_git_username_id_students_id_fk" FOREIGN KEY ("git_username_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects-details" ADD CONSTRAINT "projects-details_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;