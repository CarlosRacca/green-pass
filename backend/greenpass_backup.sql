--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: consultas; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.consultas (
    id integer NOT NULL,
    paquete text NOT NULL,
    cantidad integer DEFAULT 1,
    ultima_consulta timestamp without time zone DEFAULT now()
);


ALTER TABLE public.consultas OWNER TO carlosracca;

--
-- Name: consultas_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.consultas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consultas_id_seq OWNER TO carlosracca;

--
-- Name: consultas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.consultas_id_seq OWNED BY public.consultas.id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    telefono character varying(20),
    matricula character varying(50),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contacts OWNER TO carlosracca;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO carlosracca;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: paquetes; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.paquetes (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    destino text,
    precio numeric(10,2),
    puntos integer DEFAULT 0,
    duracion text,
    imagen_url text,
    activo boolean DEFAULT true
);


ALTER TABLE public.paquetes OWNER TO carlosracca;

--
-- Name: paquetes_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.paquetes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.paquetes_id_seq OWNER TO carlosracca;

--
-- Name: paquetes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.paquetes_id_seq OWNED BY public.paquetes.id;


--
-- Name: torneo_dias; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneo_dias (
    id integer NOT NULL,
    torneo_id integer,
    fecha date NOT NULL,
    modalidad text NOT NULL,
    CONSTRAINT torneo_dias_modalidad_check CHECK ((modalidad = ANY (ARRAY['medal'::text, 'fourball'::text, 'mejor_pelota'::text])))
);


ALTER TABLE public.torneo_dias OWNER TO carlosracca;

--
-- Name: torneo_dias_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneo_dias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneo_dias_id_seq OWNER TO carlosracca;

--
-- Name: torneo_dias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneo_dias_id_seq OWNED BY public.torneo_dias.id;


--
-- Name: torneo_jugadores; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneo_jugadores (
    id integer NOT NULL,
    torneo_id integer,
    user_id integer
);


ALTER TABLE public.torneo_jugadores OWNER TO carlosracca;

--
-- Name: torneo_jugadores_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneo_jugadores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneo_jugadores_id_seq OWNER TO carlosracca;

--
-- Name: torneo_jugadores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneo_jugadores_id_seq OWNED BY public.torneo_jugadores.id;


--
-- Name: torneo_parejas; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneo_parejas (
    id integer NOT NULL,
    dia_id integer,
    jugador_1_id integer,
    jugador_2_id integer
);


ALTER TABLE public.torneo_parejas OWNER TO carlosracca;

--
-- Name: torneo_parejas_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneo_parejas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneo_parejas_id_seq OWNER TO carlosracca;

--
-- Name: torneo_parejas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneo_parejas_id_seq OWNED BY public.torneo_parejas.id;


--
-- Name: torneo_puntajes; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneo_puntajes (
    id integer NOT NULL,
    torneo_id integer,
    dia_id integer,
    pareja_id integer,
    puntos_match integer DEFAULT 0,
    puntos_long_drive integer DEFAULT 0,
    puntos_mejor_approach integer DEFAULT 0,
    puntos_birdies_neto integer DEFAULT 0,
    puntos_birdies_gross integer DEFAULT 0,
    puntos_bogeys_neto integer DEFAULT 0,
    total_puntos integer GENERATED ALWAYS AS ((((((puntos_match + puntos_long_drive) + puntos_mejor_approach) + puntos_birdies_neto) + puntos_birdies_gross) + puntos_bogeys_neto)) STORED
);


ALTER TABLE public.torneo_puntajes OWNER TO carlosracca;

--
-- Name: torneo_puntajes_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneo_puntajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneo_puntajes_id_seq OWNER TO carlosracca;

--
-- Name: torneo_puntajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneo_puntajes_id_seq OWNED BY public.torneo_puntajes.id;


--
-- Name: torneo_resultados; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneo_resultados (
    id integer NOT NULL,
    dia_id integer,
    pareja_id integer,
    puntos integer DEFAULT 0
);


ALTER TABLE public.torneo_resultados OWNER TO carlosracca;

--
-- Name: torneo_resultados_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneo_resultados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneo_resultados_id_seq OWNER TO carlosracca;

--
-- Name: torneo_resultados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneo_resultados_id_seq OWNED BY public.torneo_resultados.id;


--
-- Name: torneo_scores; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneo_scores (
    id integer NOT NULL,
    torneo_id integer,
    dia_id integer,
    jugador_id integer,
    hoyo integer,
    score integer,
    long_drive boolean DEFAULT false,
    mejor_approach boolean DEFAULT false,
    CONSTRAINT torneo_scores_hoyo_check CHECK (((hoyo >= 1) AND (hoyo <= 18)))
);


ALTER TABLE public.torneo_scores OWNER TO carlosracca;

--
-- Name: torneo_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneo_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneo_scores_id_seq OWNER TO carlosracca;

--
-- Name: torneo_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneo_scores_id_seq OWNED BY public.torneo_scores.id;


--
-- Name: torneos; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.torneos (
    id integer NOT NULL,
    nombre text NOT NULL,
    cliente_id integer,
    fecha_inicio date,
    fecha_fin date,
    finalizado boolean DEFAULT false
);


ALTER TABLE public.torneos OWNER TO carlosracca;

--
-- Name: torneos_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.torneos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.torneos_id_seq OWNER TO carlosracca;

--
-- Name: torneos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.torneos_id_seq OWNED BY public.torneos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nombre text NOT NULL,
    apellido text NOT NULL,
    dni text,
    matricula text,
    handicap integer,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'cliente'::text,
    cliente_id integer,
    puntos integer DEFAULT 0,
    viajes_comprados integer DEFAULT 0,
    rol character varying(20) DEFAULT 'cliente'::character varying
);


ALTER TABLE public.users OWNER TO carlosracca;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO carlosracca;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: usuarios_paquetes; Type: TABLE; Schema: public; Owner: carlosracca
--

CREATE TABLE public.usuarios_paquetes (
    id integer NOT NULL,
    user_id integer,
    paquete_id integer,
    fecha_compra timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios_paquetes OWNER TO carlosracca;

--
-- Name: usuarios_paquetes_id_seq; Type: SEQUENCE; Schema: public; Owner: carlosracca
--

CREATE SEQUENCE public.usuarios_paquetes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_paquetes_id_seq OWNER TO carlosracca;

--
-- Name: usuarios_paquetes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carlosracca
--

ALTER SEQUENCE public.usuarios_paquetes_id_seq OWNED BY public.usuarios_paquetes.id;


--
-- Name: consultas id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.consultas ALTER COLUMN id SET DEFAULT nextval('public.consultas_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: paquetes id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.paquetes ALTER COLUMN id SET DEFAULT nextval('public.paquetes_id_seq'::regclass);


--
-- Name: torneo_dias id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_dias ALTER COLUMN id SET DEFAULT nextval('public.torneo_dias_id_seq'::regclass);


--
-- Name: torneo_jugadores id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_jugadores ALTER COLUMN id SET DEFAULT nextval('public.torneo_jugadores_id_seq'::regclass);


--
-- Name: torneo_parejas id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_parejas ALTER COLUMN id SET DEFAULT nextval('public.torneo_parejas_id_seq'::regclass);


--
-- Name: torneo_puntajes id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_puntajes ALTER COLUMN id SET DEFAULT nextval('public.torneo_puntajes_id_seq'::regclass);


--
-- Name: torneo_resultados id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_resultados ALTER COLUMN id SET DEFAULT nextval('public.torneo_resultados_id_seq'::regclass);


--
-- Name: torneo_scores id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_scores ALTER COLUMN id SET DEFAULT nextval('public.torneo_scores_id_seq'::regclass);


--
-- Name: torneos id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneos ALTER COLUMN id SET DEFAULT nextval('public.torneos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usuarios_paquetes id; Type: DEFAULT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.usuarios_paquetes ALTER COLUMN id SET DEFAULT nextval('public.usuarios_paquetes_id_seq'::regclass);


--
-- Data for Name: consultas; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.consultas (id, paquete, cantidad, ultima_consulta) FROM stdin;
1	Chapelco Adventure	2	2025-05-14 22:07:45.97935
2	Llao Llao Experience	3	2025-05-14 22:07:54.049908
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.contacts (id, nombre, apellido, email, telefono, matricula, fecha) FROM stdin;
\.


--
-- Data for Name: paquetes; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.paquetes (id, nombre, descripcion, destino, precio, puntos, duracion, imagen_url, activo) FROM stdin;
1	Viaje a Tandil	Torneo + alojamiento	Tandil, Buenos Aires	980.00	150	3 días / 2 noches	https://greenpass.com/tandil.jpg	t
\.


--
-- Data for Name: torneo_dias; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneo_dias (id, torneo_id, fecha, modalidad) FROM stdin;
6	4	2025-06-01	fourball
7	4	2025-06-02	fourball
8	4	2025-06-03	fourball
\.


--
-- Data for Name: torneo_jugadores; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneo_jugadores (id, torneo_id, user_id) FROM stdin;
11	4	24
12	4	25
13	4	26
14	4	27
15	4	28
16	4	29
17	4	30
18	4	31
\.


--
-- Data for Name: torneo_parejas; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneo_parejas (id, dia_id, jugador_1_id, jugador_2_id) FROM stdin;
16	6	24	25
17	6	26	27
18	6	28	29
19	6	30	31
20	7	24	25
21	7	26	27
22	7	28	29
23	7	30	31
24	8	24	25
25	8	26	27
26	8	28	29
27	8	30	31
\.


--
-- Data for Name: torneo_puntajes; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneo_puntajes (id, torneo_id, dia_id, pareja_id, puntos_match, puntos_long_drive, puntos_mejor_approach, puntos_birdies_neto, puntos_birdies_gross, puntos_bogeys_neto) FROM stdin;
\.


--
-- Data for Name: torneo_resultados; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneo_resultados (id, dia_id, pareja_id, puntos) FROM stdin;
1	6	16	3
2	6	17	4
3	6	18	4
4	6	19	4
5	7	20	3
6	7	21	4
7	7	22	3
8	7	23	4
9	8	24	3
10	8	25	3
11	8	26	3
12	8	27	3
\.


--
-- Data for Name: torneo_scores; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneo_scores (id, torneo_id, dia_id, jugador_id, hoyo, score, long_drive, mejor_approach) FROM stdin;
437	4	6	24	1	4	f	f
438	4	6	24	2	4	f	f
439	4	6	24	3	4	f	f
440	4	6	24	4	5	f	f
441	4	6	24	5	3	f	f
442	4	6	24	6	4	f	f
443	4	6	24	7	4	f	f
444	4	6	24	8	5	f	f
445	4	6	24	9	3	f	f
446	4	6	24	10	4	f	f
447	4	6	24	11	3	f	f
448	4	6	24	12	3	f	f
449	4	6	24	13	3	f	f
450	4	6	24	14	4	f	f
451	4	6	24	15	5	f	f
452	4	6	24	16	3	f	f
453	4	6	24	17	5	f	f
454	4	6	24	18	3	f	f
455	4	6	25	1	4	f	f
456	4	6	25	2	4	f	f
457	4	6	25	3	4	f	f
458	4	6	25	4	4	f	f
459	4	6	25	5	3	f	f
460	4	6	25	6	4	f	f
461	4	6	25	7	5	f	f
462	4	6	25	8	3	f	f
463	4	6	25	9	4	f	f
464	4	6	25	10	5	f	f
465	4	6	25	11	5	f	f
466	4	6	25	12	5	f	f
467	4	6	25	13	4	f	f
468	4	6	25	14	5	f	f
469	4	6	25	15	4	f	f
470	4	6	25	16	5	f	f
471	4	6	25	17	3	f	t
472	4	6	25	18	4	f	f
473	4	6	26	1	4	f	f
474	4	6	26	2	4	f	f
475	4	6	26	3	3	f	f
476	4	6	26	4	5	f	f
477	4	6	26	5	3	f	f
478	4	6	26	6	4	f	f
479	4	6	26	7	4	f	f
480	4	6	26	8	5	f	f
481	4	6	26	9	3	f	f
482	4	6	26	10	5	f	f
483	4	6	26	11	4	f	f
484	4	6	26	12	4	f	f
485	4	6	26	13	5	f	f
486	4	6	26	14	3	f	f
487	4	6	26	15	3	f	f
488	4	6	26	16	4	f	f
489	4	6	26	17	3	f	t
490	4	6	26	18	5	f	f
491	4	6	27	1	4	f	f
492	4	6	27	2	5	f	f
493	4	6	27	3	4	f	f
494	4	6	27	4	4	f	f
495	4	6	27	5	5	f	f
496	4	6	27	6	5	f	f
497	4	6	27	7	3	f	f
498	4	6	27	8	4	f	f
499	4	6	27	9	4	t	f
500	4	6	27	10	3	f	f
501	4	6	27	11	3	f	f
502	4	6	27	12	4	f	f
503	4	6	27	13	5	f	f
504	4	6	27	14	3	f	f
505	4	6	27	15	4	f	f
506	4	6	27	16	3	f	f
507	4	6	27	17	5	f	t
508	4	6	27	18	5	f	f
509	4	6	28	1	4	f	f
510	4	6	28	2	4	f	f
511	4	6	28	3	5	f	f
512	4	6	28	4	4	f	f
513	4	6	28	5	5	f	f
514	4	6	28	6	3	f	f
515	4	6	28	7	5	f	f
516	4	6	28	8	4	f	f
517	4	6	28	9	3	t	f
518	4	6	28	10	4	f	f
519	4	6	28	11	4	f	f
520	4	6	28	12	5	f	f
521	4	6	28	13	4	f	f
522	4	6	28	14	5	f	f
523	4	6	28	15	3	f	f
524	4	6	28	16	4	f	f
525	4	6	28	17	3	f	t
526	4	6	28	18	5	f	f
527	4	6	29	1	3	f	f
528	4	6	29	2	4	f	f
529	4	6	29	3	3	f	f
530	4	6	29	4	4	f	f
531	4	6	29	5	5	f	f
532	4	6	29	6	5	f	f
533	4	6	29	7	5	f	f
534	4	6	29	8	5	f	f
535	4	6	29	9	5	t	f
536	4	6	29	10	3	f	f
537	4	6	29	11	3	f	f
538	4	6	29	12	3	f	f
539	4	6	29	13	5	f	f
540	4	6	29	14	5	f	f
541	4	6	29	15	5	f	f
542	4	6	29	16	3	f	f
543	4	6	29	17	4	f	f
544	4	6	29	18	4	f	f
545	4	6	30	1	5	f	f
546	4	6	30	2	3	f	f
547	4	6	30	3	3	f	f
548	4	6	30	4	3	f	f
549	4	6	30	5	3	f	f
550	4	6	30	6	5	f	f
551	4	6	30	7	4	f	f
552	4	6	30	8	4	f	f
553	4	6	30	9	3	f	f
554	4	6	30	10	5	f	f
555	4	6	30	11	4	f	f
556	4	6	30	12	4	f	f
557	4	6	30	13	3	f	f
558	4	6	30	14	3	f	f
559	4	6	30	15	5	f	f
560	4	6	30	16	4	f	f
561	4	6	30	17	4	f	f
562	4	6	30	18	3	f	f
563	4	6	31	1	4	f	f
564	4	6	31	2	5	f	f
565	4	6	31	3	3	f	f
566	4	6	31	4	3	f	f
567	4	6	31	5	4	f	f
568	4	6	31	6	5	f	f
569	4	6	31	7	3	f	f
570	4	6	31	8	5	f	f
571	4	6	31	9	5	t	f
572	4	6	31	10	4	f	f
573	4	6	31	11	4	f	f
574	4	6	31	12	5	f	f
575	4	6	31	13	4	f	f
576	4	6	31	14	5	f	f
577	4	6	31	15	4	f	f
578	4	6	31	16	4	f	f
579	4	6	31	17	4	f	t
580	4	6	31	18	5	f	f
581	4	7	24	1	3	f	f
582	4	7	24	2	3	f	f
583	4	7	24	3	5	f	f
584	4	7	24	4	5	f	f
585	4	7	24	5	5	f	f
586	4	7	24	6	5	f	f
587	4	7	24	7	3	f	f
588	4	7	24	8	3	f	f
589	4	7	24	9	3	f	f
590	4	7	24	10	4	f	f
591	4	7	24	11	5	f	f
592	4	7	24	12	4	f	f
593	4	7	24	13	4	f	f
594	4	7	24	14	3	f	f
595	4	7	24	15	3	f	f
596	4	7	24	16	3	f	f
597	4	7	24	17	3	f	t
598	4	7	24	18	4	f	f
599	4	7	25	1	4	f	f
600	4	7	25	2	4	f	f
601	4	7	25	3	4	f	f
602	4	7	25	4	5	f	f
603	4	7	25	5	3	f	f
604	4	7	25	6	3	f	f
605	4	7	25	7	3	f	f
606	4	7	25	8	5	f	f
607	4	7	25	9	3	f	f
608	4	7	25	10	5	f	f
609	4	7	25	11	5	f	f
610	4	7	25	12	5	f	f
611	4	7	25	13	3	f	f
612	4	7	25	14	4	f	f
613	4	7	25	15	5	f	f
614	4	7	25	16	4	f	f
615	4	7	25	17	4	f	t
616	4	7	25	18	4	f	f
617	4	7	26	1	5	f	f
618	4	7	26	2	4	f	f
619	4	7	26	3	5	f	f
620	4	7	26	4	5	f	f
621	4	7	26	5	4	f	f
622	4	7	26	6	3	f	f
623	4	7	26	7	3	f	f
624	4	7	26	8	3	f	f
625	4	7	26	9	3	t	f
626	4	7	26	10	3	f	f
627	4	7	26	11	5	f	f
628	4	7	26	12	3	f	f
629	4	7	26	13	5	f	f
630	4	7	26	14	3	f	f
631	4	7	26	15	5	f	f
632	4	7	26	16	5	f	f
633	4	7	26	17	5	f	f
634	4	7	26	18	4	f	f
635	4	7	27	1	4	f	f
636	4	7	27	2	4	f	f
637	4	7	27	3	3	f	f
638	4	7	27	4	3	f	f
639	4	7	27	5	4	f	f
640	4	7	27	6	3	f	f
641	4	7	27	7	3	f	f
642	4	7	27	8	3	f	f
643	4	7	27	9	5	f	f
644	4	7	27	10	5	f	f
645	4	7	27	11	5	f	f
646	4	7	27	12	3	f	f
647	4	7	27	13	4	f	f
648	4	7	27	14	5	f	f
649	4	7	27	15	5	f	f
650	4	7	27	16	4	f	f
651	4	7	27	17	3	f	t
652	4	7	27	18	4	f	f
653	4	7	28	1	5	f	f
654	4	7	28	2	3	f	f
655	4	7	28	3	3	f	f
656	4	7	28	4	3	f	f
657	4	7	28	5	4	f	f
658	4	7	28	6	5	f	f
659	4	7	28	7	4	f	f
660	4	7	28	8	4	f	f
661	4	7	28	9	3	f	f
662	4	7	28	10	5	f	f
663	4	7	28	11	5	f	f
664	4	7	28	12	4	f	f
665	4	7	28	13	3	f	f
666	4	7	28	14	3	f	f
667	4	7	28	15	5	f	f
668	4	7	28	16	5	f	f
669	4	7	28	17	3	f	f
670	4	7	28	18	4	f	f
671	4	7	29	1	5	f	f
672	4	7	29	2	3	f	f
673	4	7	29	3	4	f	f
674	4	7	29	4	4	f	f
675	4	7	29	5	4	f	f
676	4	7	29	6	4	f	f
677	4	7	29	7	4	f	f
678	4	7	29	8	4	f	f
679	4	7	29	9	4	t	f
680	4	7	29	10	5	f	f
681	4	7	29	11	4	f	f
682	4	7	29	12	3	f	f
683	4	7	29	13	3	f	f
684	4	7	29	14	5	f	f
685	4	7	29	15	3	f	f
686	4	7	29	16	5	f	f
687	4	7	29	17	3	f	f
688	4	7	29	18	4	f	f
689	4	7	30	1	5	f	f
690	4	7	30	2	3	f	f
691	4	7	30	3	3	f	f
692	4	7	30	4	3	f	f
693	4	7	30	5	5	f	f
694	4	7	30	6	3	f	f
695	4	7	30	7	4	f	f
696	4	7	30	8	3	f	f
697	4	7	30	9	4	f	f
698	4	7	30	10	3	f	f
699	4	7	30	11	3	f	f
700	4	7	30	12	3	f	f
701	4	7	30	13	5	f	f
702	4	7	30	14	5	f	f
703	4	7	30	15	5	f	f
704	4	7	30	16	3	f	f
705	4	7	30	17	4	f	f
706	4	7	30	18	4	f	f
707	4	7	31	1	4	f	f
708	4	7	31	2	5	f	f
709	4	7	31	3	5	f	f
710	4	7	31	4	3	f	f
711	4	7	31	5	3	f	f
712	4	7	31	6	3	f	f
713	4	7	31	7	5	f	f
714	4	7	31	8	3	f	f
715	4	7	31	9	4	t	f
716	4	7	31	10	5	f	f
717	4	7	31	11	4	f	f
718	4	7	31	12	5	f	f
719	4	7	31	13	3	f	f
720	4	7	31	14	3	f	f
721	4	7	31	15	4	f	f
722	4	7	31	16	4	f	f
723	4	7	31	17	3	f	t
724	4	7	31	18	4	f	f
725	4	8	24	1	4	f	f
726	4	8	24	2	4	f	f
727	4	8	24	3	3	f	f
728	4	8	24	4	3	f	f
729	4	8	24	5	5	f	f
730	4	8	24	6	5	f	f
731	4	8	24	7	5	f	f
732	4	8	24	8	5	f	f
733	4	8	24	9	5	f	f
734	4	8	24	10	4	f	f
735	4	8	24	11	3	f	f
736	4	8	24	12	3	f	f
737	4	8	24	13	4	f	f
738	4	8	24	14	5	f	f
739	4	8	24	15	3	f	f
740	4	8	24	16	5	f	f
741	4	8	24	17	4	f	f
742	4	8	24	18	5	f	f
743	4	8	25	1	4	f	f
744	4	8	25	2	5	f	f
745	4	8	25	3	5	f	f
746	4	8	25	4	4	f	f
747	4	8	25	5	5	f	f
748	4	8	25	6	5	f	f
749	4	8	25	7	4	f	f
750	4	8	25	8	5	f	f
751	4	8	25	9	4	t	f
752	4	8	25	10	4	f	f
753	4	8	25	11	4	f	f
754	4	8	25	12	4	f	f
755	4	8	25	13	3	f	f
756	4	8	25	14	3	f	f
757	4	8	25	15	5	f	f
758	4	8	25	16	4	f	f
759	4	8	25	17	5	f	f
760	4	8	25	18	4	f	f
761	4	8	26	1	5	f	f
762	4	8	26	2	3	f	f
763	4	8	26	3	5	f	f
764	4	8	26	4	5	f	f
765	4	8	26	5	5	f	f
766	4	8	26	6	3	f	f
767	4	8	26	7	5	f	f
768	4	8	26	8	4	f	f
769	4	8	26	9	4	f	f
770	4	8	26	10	5	f	f
771	4	8	26	11	4	f	f
772	4	8	26	12	3	f	f
773	4	8	26	13	3	f	f
774	4	8	26	14	3	f	f
775	4	8	26	15	4	f	f
776	4	8	26	16	3	f	f
777	4	8	26	17	5	f	t
778	4	8	26	18	4	f	f
779	4	8	27	1	3	f	f
780	4	8	27	2	4	f	f
781	4	8	27	3	4	f	f
782	4	8	27	4	3	f	f
783	4	8	27	5	5	f	f
784	4	8	27	6	4	f	f
785	4	8	27	7	5	f	f
786	4	8	27	8	5	f	f
787	4	8	27	9	3	f	f
788	4	8	27	10	5	f	f
789	4	8	27	11	3	f	f
790	4	8	27	12	3	f	f
791	4	8	27	13	5	f	f
792	4	8	27	14	5	f	f
793	4	8	27	15	4	f	f
794	4	8	27	16	5	f	f
795	4	8	27	17	4	f	f
796	4	8	27	18	4	f	f
797	4	8	28	1	3	f	f
798	4	8	28	2	4	f	f
799	4	8	28	3	5	f	f
800	4	8	28	4	3	f	f
801	4	8	28	5	4	f	f
802	4	8	28	6	5	f	f
803	4	8	28	7	3	f	f
804	4	8	28	8	5	f	f
805	4	8	28	9	5	f	f
806	4	8	28	10	3	f	f
807	4	8	28	11	3	f	f
808	4	8	28	12	4	f	f
809	4	8	28	13	5	f	f
810	4	8	28	14	3	f	f
811	4	8	28	15	4	f	f
812	4	8	28	16	4	f	f
813	4	8	28	17	3	f	t
814	4	8	28	18	5	f	f
815	4	8	29	1	4	f	f
816	4	8	29	2	3	f	f
817	4	8	29	3	4	f	f
818	4	8	29	4	4	f	f
819	4	8	29	5	3	f	f
820	4	8	29	6	3	f	f
821	4	8	29	7	3	f	f
822	4	8	29	8	3	f	f
823	4	8	29	9	4	f	f
824	4	8	29	10	5	f	f
825	4	8	29	11	3	f	f
826	4	8	29	12	3	f	f
827	4	8	29	13	5	f	f
828	4	8	29	14	3	f	f
829	4	8	29	15	4	f	f
830	4	8	29	16	5	f	f
831	4	8	29	17	4	f	t
832	4	8	29	18	3	f	f
833	4	8	30	1	4	f	f
834	4	8	30	2	5	f	f
835	4	8	30	3	5	f	f
836	4	8	30	4	3	f	f
837	4	8	30	5	5	f	f
838	4	8	30	6	5	f	f
839	4	8	30	7	5	f	f
840	4	8	30	8	5	f	f
841	4	8	30	9	5	f	f
842	4	8	30	10	4	f	f
843	4	8	30	11	3	f	f
844	4	8	30	12	3	f	f
845	4	8	30	13	5	f	f
846	4	8	30	14	5	f	f
847	4	8	30	15	5	f	f
848	4	8	30	16	4	f	f
849	4	8	30	17	5	f	f
850	4	8	30	18	5	f	f
851	4	8	31	1	3	f	f
852	4	8	31	2	4	f	f
853	4	8	31	3	5	f	f
854	4	8	31	4	5	f	f
855	4	8	31	5	5	f	f
856	4	8	31	6	4	f	f
857	4	8	31	7	4	f	f
858	4	8	31	8	3	f	f
859	4	8	31	9	3	t	f
860	4	8	31	10	4	f	f
861	4	8	31	11	4	f	f
862	4	8	31	12	3	f	f
863	4	8	31	13	5	f	f
864	4	8	31	14	4	f	f
865	4	8	31	15	4	f	f
866	4	8	31	16	4	f	f
867	4	8	31	17	4	f	f
868	4	8	31	18	3	f	f
\.


--
-- Data for Name: torneos; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.torneos (id, nombre, cliente_id, fecha_inicio, fecha_fin, finalizado) FROM stdin;
4	Torneo Simulado Green Pass	12	2025-06-01	2025-06-03	f
5	Tandil golf	36	2025-05-30	2025-06-01	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.users (id, nombre, apellido, dni, matricula, handicap, email, password, role, cliente_id, puntos, viajes_comprados, rol) FROM stdin;
24	Carlos	Racca	11111111	A001	10	carlos@greenpass.com	123456	cliente	12	0	0	cliente
25	Juan	Pérez	22222222	A002	12	juan@greenpass.com	123456	cliente	12	0	0	cliente
26	Ana	López	33333333	A003	15	ana@greenpass.com	123456	cliente	12	0	0	cliente
27	Pedro	Martínez	44444444	A004	8	pedro@greenpass.com	123456	cliente	12	0	0	cliente
28	Lucía	González	55555555	A005	11	lucia@greenpass.com	123456	cliente	12	0	0	cliente
29	Diego	Ramírez	66666666	A006	9	diego@greenpass.com	123456	cliente	12	0	0	cliente
30	Valentina	Suárez	77777777	A007	13	valentina@greenpass.com	123456	cliente	12	0	0	cliente
31	Martín	Gutiérrez	88888888	A008	14	martin@greenpass.com	123456	cliente	12	0	0	cliente
12	Green	Admin	99999999	CLI001	0	admin@greenpass.com	$2a$10$6xv5ZzOImWkOyzOlhBczQe5Ry4AzZiq5KkbZbTJG0xnpYdAJSBR1y	superadmin	\N	0	0	superadmin
34	Carlos	Admin	12345678	SUPER01	0	superadmin@greenpass.com	$2b$10$OBjxCZwmpJxRce5/EGLGI.8hP2m6Fkgqf1qcyoh1k7CapmPVr3bBW	superadmin	\N	0	0	cliente
36	Juan	Racca	39212111	117546	4	juanracca_@hotmail.com	$2b$10$Ws6F6IDBacx/boCEGZJDCOEpffiKVP3FT9lHSjiLM.ProrvnXU7J2	cliente	\N	0	0	cliente
\.


--
-- Data for Name: usuarios_paquetes; Type: TABLE DATA; Schema: public; Owner: carlosracca
--

COPY public.usuarios_paquetes (id, user_id, paquete_id, fecha_compra) FROM stdin;
\.


--
-- Name: consultas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.consultas_id_seq', 2, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);


--
-- Name: paquetes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.paquetes_id_seq', 1, true);


--
-- Name: torneo_dias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneo_dias_id_seq', 8, true);


--
-- Name: torneo_jugadores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneo_jugadores_id_seq', 18, true);


--
-- Name: torneo_parejas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneo_parejas_id_seq', 27, true);


--
-- Name: torneo_puntajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneo_puntajes_id_seq', 1, false);


--
-- Name: torneo_resultados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneo_resultados_id_seq', 12, true);


--
-- Name: torneo_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneo_scores_id_seq', 868, true);


--
-- Name: torneos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.torneos_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.users_id_seq', 36, true);


--
-- Name: usuarios_paquetes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carlosracca
--

SELECT pg_catalog.setval('public.usuarios_paquetes_id_seq', 2, true);


--
-- Name: consultas consultas_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: paquetes paquetes_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.paquetes
    ADD CONSTRAINT paquetes_pkey PRIMARY KEY (id);


--
-- Name: torneo_dias torneo_dias_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_dias
    ADD CONSTRAINT torneo_dias_pkey PRIMARY KEY (id);


--
-- Name: torneo_jugadores torneo_jugadores_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_jugadores
    ADD CONSTRAINT torneo_jugadores_pkey PRIMARY KEY (id);


--
-- Name: torneo_parejas torneo_parejas_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_parejas
    ADD CONSTRAINT torneo_parejas_pkey PRIMARY KEY (id);


--
-- Name: torneo_puntajes torneo_puntajes_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_puntajes
    ADD CONSTRAINT torneo_puntajes_pkey PRIMARY KEY (id);


--
-- Name: torneo_resultados torneo_resultados_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_resultados
    ADD CONSTRAINT torneo_resultados_pkey PRIMARY KEY (id);


--
-- Name: torneo_scores torneo_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_scores
    ADD CONSTRAINT torneo_scores_pkey PRIMARY KEY (id);


--
-- Name: torneos torneos_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneos
    ADD CONSTRAINT torneos_pkey PRIMARY KEY (id);


--
-- Name: users users_dni_key; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_dni_key UNIQUE (dni);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: usuarios_paquetes usuarios_paquetes_pkey; Type: CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.usuarios_paquetes
    ADD CONSTRAINT usuarios_paquetes_pkey PRIMARY KEY (id);


--
-- Name: torneo_dias torneo_dias_torneo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_dias
    ADD CONSTRAINT torneo_dias_torneo_id_fkey FOREIGN KEY (torneo_id) REFERENCES public.torneos(id);


--
-- Name: torneo_jugadores torneo_jugadores_torneo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_jugadores
    ADD CONSTRAINT torneo_jugadores_torneo_id_fkey FOREIGN KEY (torneo_id) REFERENCES public.torneos(id);


--
-- Name: torneo_jugadores torneo_jugadores_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_jugadores
    ADD CONSTRAINT torneo_jugadores_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: torneo_parejas torneo_parejas_dia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_parejas
    ADD CONSTRAINT torneo_parejas_dia_id_fkey FOREIGN KEY (dia_id) REFERENCES public.torneo_dias(id);


--
-- Name: torneo_parejas torneo_parejas_jugador_1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_parejas
    ADD CONSTRAINT torneo_parejas_jugador_1_id_fkey FOREIGN KEY (jugador_1_id) REFERENCES public.users(id);


--
-- Name: torneo_parejas torneo_parejas_jugador_2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_parejas
    ADD CONSTRAINT torneo_parejas_jugador_2_id_fkey FOREIGN KEY (jugador_2_id) REFERENCES public.users(id);


--
-- Name: torneo_puntajes torneo_puntajes_dia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_puntajes
    ADD CONSTRAINT torneo_puntajes_dia_id_fkey FOREIGN KEY (dia_id) REFERENCES public.torneo_dias(id);


--
-- Name: torneo_puntajes torneo_puntajes_pareja_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_puntajes
    ADD CONSTRAINT torneo_puntajes_pareja_id_fkey FOREIGN KEY (pareja_id) REFERENCES public.torneo_parejas(id);


--
-- Name: torneo_puntajes torneo_puntajes_torneo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_puntajes
    ADD CONSTRAINT torneo_puntajes_torneo_id_fkey FOREIGN KEY (torneo_id) REFERENCES public.torneos(id);


--
-- Name: torneo_resultados torneo_resultados_dia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_resultados
    ADD CONSTRAINT torneo_resultados_dia_id_fkey FOREIGN KEY (dia_id) REFERENCES public.torneo_dias(id);


--
-- Name: torneo_resultados torneo_resultados_pareja_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_resultados
    ADD CONSTRAINT torneo_resultados_pareja_id_fkey FOREIGN KEY (pareja_id) REFERENCES public.torneo_parejas(id);


--
-- Name: torneo_scores torneo_scores_dia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_scores
    ADD CONSTRAINT torneo_scores_dia_id_fkey FOREIGN KEY (dia_id) REFERENCES public.torneo_dias(id);


--
-- Name: torneo_scores torneo_scores_jugador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_scores
    ADD CONSTRAINT torneo_scores_jugador_id_fkey FOREIGN KEY (jugador_id) REFERENCES public.users(id);


--
-- Name: torneo_scores torneo_scores_torneo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneo_scores
    ADD CONSTRAINT torneo_scores_torneo_id_fkey FOREIGN KEY (torneo_id) REFERENCES public.torneos(id);


--
-- Name: torneos torneos_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.torneos
    ADD CONSTRAINT torneos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.users(id);


--
-- Name: usuarios_paquetes usuarios_paquetes_paquete_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.usuarios_paquetes
    ADD CONSTRAINT usuarios_paquetes_paquete_id_fkey FOREIGN KEY (paquete_id) REFERENCES public.paquetes(id);


--
-- Name: usuarios_paquetes usuarios_paquetes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: carlosracca
--

ALTER TABLE ONLY public.usuarios_paquetes
    ADD CONSTRAINT usuarios_paquetes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

