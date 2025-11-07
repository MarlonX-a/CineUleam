
  create table "public"."asistencia" (
    "id_asistencia" bigint generated always as identity not null,
    "id_reserva" bigint,
    "asistio" boolean not null,
    "hora_registro" time without time zone
      );



  create table "public"."funcion" (
    "id_funcion" bigint generated always as identity not null,
    "fecha" date not null,
    "hora" time without time zone not null,
    "id_pelicula" bigint not null,
    "id_sala" bigint not null
      );



  create table "public"."pelicula" (
    "id_pelicula" bigint generated always as identity not null,
    "titulo" character varying not null,
    "genero" character varying not null,
    "duracion" bigint not null,
    "clasificacion" character varying not null,
    "sinopsis" text not null,
    "imagen_url" text not null
      );



  create table "public"."reserva" (
    "id_reserva" bigint generated always as identity not null,
    "fecha_reserva" date not null,
    "user_id" bigint not null,
    "id_funcion" bigint not null,
    "estado" character varying not null
      );



  create table "public"."sala" (
    "id_sala" bigint generated always as identity not null,
    "nombre" character varying not null,
    "capacidad" bigint not null,
    "ubicacion" character varying not null
      );



  create table "public"."user" (
    "id" bigint generated always as identity not null,
    "username" character varying not null,
    "password" character varying not null,
    "email" character varying not null,
    "first_name" character varying not null,
    "last_name" character varying not null,
    "tipo" text not null
      );


CREATE UNIQUE INDEX asistencia_pkey ON public.asistencia USING btree (id_asistencia);

CREATE UNIQUE INDEX funcion_pkey ON public.funcion USING btree (id_funcion);

CREATE UNIQUE INDEX pelicula_pkey ON public.pelicula USING btree (id_pelicula);

CREATE UNIQUE INDEX reserva_pkey ON public.reserva USING btree (id_reserva);

CREATE UNIQUE INDEX sala_pkey ON public.sala USING btree (id_sala);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."asistencia" add constraint "asistencia_pkey" PRIMARY KEY using index "asistencia_pkey";

alter table "public"."funcion" add constraint "funcion_pkey" PRIMARY KEY using index "funcion_pkey";

alter table "public"."pelicula" add constraint "pelicula_pkey" PRIMARY KEY using index "pelicula_pkey";

alter table "public"."reserva" add constraint "reserva_pkey" PRIMARY KEY using index "reserva_pkey";

alter table "public"."sala" add constraint "sala_pkey" PRIMARY KEY using index "sala_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."asistencia" add constraint "asistencia_id_reserva_fkey" FOREIGN KEY (id_reserva) REFERENCES public.reserva(id_reserva) not valid;

alter table "public"."asistencia" validate constraint "asistencia_id_reserva_fkey";

alter table "public"."funcion" add constraint "funcion_id_pelicula_fkey" FOREIGN KEY (id_pelicula) REFERENCES public.pelicula(id_pelicula) not valid;

alter table "public"."funcion" validate constraint "funcion_id_pelicula_fkey";

alter table "public"."funcion" add constraint "funcion_id_sala_fkey" FOREIGN KEY (id_sala) REFERENCES public.sala(id_sala) not valid;

alter table "public"."funcion" validate constraint "funcion_id_sala_fkey";

alter table "public"."reserva" add constraint "reserva_id_funcion_fkey" FOREIGN KEY (id_funcion) REFERENCES public.funcion(id_funcion) not valid;

alter table "public"."reserva" validate constraint "reserva_id_funcion_fkey";

alter table "public"."reserva" add constraint "reserva_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) not valid;

alter table "public"."reserva" validate constraint "reserva_user_id_fkey";

grant delete on table "public"."asistencia" to "anon";

grant insert on table "public"."asistencia" to "anon";

grant references on table "public"."asistencia" to "anon";

grant select on table "public"."asistencia" to "anon";

grant trigger on table "public"."asistencia" to "anon";

grant truncate on table "public"."asistencia" to "anon";

grant update on table "public"."asistencia" to "anon";

grant delete on table "public"."asistencia" to "authenticated";

grant insert on table "public"."asistencia" to "authenticated";

grant references on table "public"."asistencia" to "authenticated";

grant select on table "public"."asistencia" to "authenticated";

grant trigger on table "public"."asistencia" to "authenticated";

grant truncate on table "public"."asistencia" to "authenticated";

grant update on table "public"."asistencia" to "authenticated";

grant delete on table "public"."asistencia" to "service_role";

grant insert on table "public"."asistencia" to "service_role";

grant references on table "public"."asistencia" to "service_role";

grant select on table "public"."asistencia" to "service_role";

grant trigger on table "public"."asistencia" to "service_role";

grant truncate on table "public"."asistencia" to "service_role";

grant update on table "public"."asistencia" to "service_role";

grant delete on table "public"."funcion" to "anon";

grant insert on table "public"."funcion" to "anon";

grant references on table "public"."funcion" to "anon";

grant select on table "public"."funcion" to "anon";

grant trigger on table "public"."funcion" to "anon";

grant truncate on table "public"."funcion" to "anon";

grant update on table "public"."funcion" to "anon";

grant delete on table "public"."funcion" to "authenticated";

grant insert on table "public"."funcion" to "authenticated";

grant references on table "public"."funcion" to "authenticated";

grant select on table "public"."funcion" to "authenticated";

grant trigger on table "public"."funcion" to "authenticated";

grant truncate on table "public"."funcion" to "authenticated";

grant update on table "public"."funcion" to "authenticated";

grant delete on table "public"."funcion" to "service_role";

grant insert on table "public"."funcion" to "service_role";

grant references on table "public"."funcion" to "service_role";

grant select on table "public"."funcion" to "service_role";

grant trigger on table "public"."funcion" to "service_role";

grant truncate on table "public"."funcion" to "service_role";

grant update on table "public"."funcion" to "service_role";

grant delete on table "public"."pelicula" to "anon";

grant insert on table "public"."pelicula" to "anon";

grant references on table "public"."pelicula" to "anon";

grant select on table "public"."pelicula" to "anon";

grant trigger on table "public"."pelicula" to "anon";

grant truncate on table "public"."pelicula" to "anon";

grant update on table "public"."pelicula" to "anon";

grant delete on table "public"."pelicula" to "authenticated";

grant insert on table "public"."pelicula" to "authenticated";

grant references on table "public"."pelicula" to "authenticated";

grant select on table "public"."pelicula" to "authenticated";

grant trigger on table "public"."pelicula" to "authenticated";

grant truncate on table "public"."pelicula" to "authenticated";

grant update on table "public"."pelicula" to "authenticated";

grant delete on table "public"."pelicula" to "service_role";

grant insert on table "public"."pelicula" to "service_role";

grant references on table "public"."pelicula" to "service_role";

grant select on table "public"."pelicula" to "service_role";

grant trigger on table "public"."pelicula" to "service_role";

grant truncate on table "public"."pelicula" to "service_role";

grant update on table "public"."pelicula" to "service_role";

grant delete on table "public"."reserva" to "anon";

grant insert on table "public"."reserva" to "anon";

grant references on table "public"."reserva" to "anon";

grant select on table "public"."reserva" to "anon";

grant trigger on table "public"."reserva" to "anon";

grant truncate on table "public"."reserva" to "anon";

grant update on table "public"."reserva" to "anon";

grant delete on table "public"."reserva" to "authenticated";

grant insert on table "public"."reserva" to "authenticated";

grant references on table "public"."reserva" to "authenticated";

grant select on table "public"."reserva" to "authenticated";

grant trigger on table "public"."reserva" to "authenticated";

grant truncate on table "public"."reserva" to "authenticated";

grant update on table "public"."reserva" to "authenticated";

grant delete on table "public"."reserva" to "service_role";

grant insert on table "public"."reserva" to "service_role";

grant references on table "public"."reserva" to "service_role";

grant select on table "public"."reserva" to "service_role";

grant trigger on table "public"."reserva" to "service_role";

grant truncate on table "public"."reserva" to "service_role";

grant update on table "public"."reserva" to "service_role";

grant delete on table "public"."sala" to "anon";

grant insert on table "public"."sala" to "anon";

grant references on table "public"."sala" to "anon";

grant select on table "public"."sala" to "anon";

grant trigger on table "public"."sala" to "anon";

grant truncate on table "public"."sala" to "anon";

grant update on table "public"."sala" to "anon";

grant delete on table "public"."sala" to "authenticated";

grant insert on table "public"."sala" to "authenticated";

grant references on table "public"."sala" to "authenticated";

grant select on table "public"."sala" to "authenticated";

grant trigger on table "public"."sala" to "authenticated";

grant truncate on table "public"."sala" to "authenticated";

grant update on table "public"."sala" to "authenticated";

grant delete on table "public"."sala" to "service_role";

grant insert on table "public"."sala" to "service_role";

grant references on table "public"."sala" to "service_role";

grant select on table "public"."sala" to "service_role";

grant trigger on table "public"."sala" to "service_role";

grant truncate on table "public"."sala" to "service_role";

grant update on table "public"."sala" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


