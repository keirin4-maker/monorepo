
  create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text,
    "avatar_url" text
      );


alter table "public"."profiles" enable row level security;


  create table "public"."resumes" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "title" text,
    "content" jsonb,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."resumes" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX resumes_pkey ON public.resumes USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."resumes" add constraint "resumes_pkey" PRIMARY KEY using index "resumes_pkey";

alter table "public"."profiles" add constraint "fk_user" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "fk_user";

alter table "public"."resumes" add constraint "fk_user" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."resumes" validate constraint "fk_user";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."resumes" to "anon";

grant insert on table "public"."resumes" to "anon";

grant references on table "public"."resumes" to "anon";

grant select on table "public"."resumes" to "anon";

grant trigger on table "public"."resumes" to "anon";

grant truncate on table "public"."resumes" to "anon";

grant update on table "public"."resumes" to "anon";

grant delete on table "public"."resumes" to "authenticated";

grant insert on table "public"."resumes" to "authenticated";

grant references on table "public"."resumes" to "authenticated";

grant select on table "public"."resumes" to "authenticated";

grant trigger on table "public"."resumes" to "authenticated";

grant truncate on table "public"."resumes" to "authenticated";

grant update on table "public"."resumes" to "authenticated";

grant delete on table "public"."resumes" to "service_role";

grant insert on table "public"."resumes" to "service_role";

grant references on table "public"."resumes" to "service_role";

grant select on table "public"."resumes" to "service_role";

grant trigger on table "public"."resumes" to "service_role";

grant truncate on table "public"."resumes" to "service_role";

grant update on table "public"."resumes" to "service_role";


