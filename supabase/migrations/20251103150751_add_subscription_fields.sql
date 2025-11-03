alter table "public"."profiles" add column "lemon_customer_id" text;

alter table "public"."profiles" add column "lemon_plan_id" text;

alter table "public"."profiles" add column "lemon_status" text default 'inactive'::text;

alter table "public"."profiles" add column "lemon_subscription_id" text;


