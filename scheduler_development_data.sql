--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

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
-- Name: appointments; Type: TABLE; Schema: public; Owner: development
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    "time" character varying(255) NOT NULL,
    day_id integer
);


ALTER TABLE public.appointments OWNER TO development;

--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: development
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointments_id_seq OWNER TO development;

--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: development
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: available_interviewers; Type: TABLE; Schema: public; Owner: development
--

CREATE TABLE public.available_interviewers (
    id integer NOT NULL,
    day_id integer,
    interviewer_id integer
);


ALTER TABLE public.available_interviewers OWNER TO development;

--
-- Name: available_interviewers_id_seq; Type: SEQUENCE; Schema: public; Owner: development
--

CREATE SEQUENCE public.available_interviewers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.available_interviewers_id_seq OWNER TO development;

--
-- Name: available_interviewers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: development
--

ALTER SEQUENCE public.available_interviewers_id_seq OWNED BY public.available_interviewers.id;


--
-- Name: days; Type: TABLE; Schema: public; Owner: development
--

CREATE TABLE public.days (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.days OWNER TO development;

--
-- Name: days_id_seq; Type: SEQUENCE; Schema: public; Owner: development
--

CREATE SEQUENCE public.days_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.days_id_seq OWNER TO development;

--
-- Name: days_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: development
--

ALTER SEQUENCE public.days_id_seq OWNED BY public.days.id;


--
-- Name: interviewers; Type: TABLE; Schema: public; Owner: development
--

CREATE TABLE public.interviewers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    avatar character varying(255) NOT NULL
);


ALTER TABLE public.interviewers OWNER TO development;

--
-- Name: interviewers_id_seq; Type: SEQUENCE; Schema: public; Owner: development
--

CREATE SEQUENCE public.interviewers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.interviewers_id_seq OWNER TO development;

--
-- Name: interviewers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: development
--

ALTER SEQUENCE public.interviewers_id_seq OWNED BY public.interviewers.id;


--
-- Name: interviews; Type: TABLE; Schema: public; Owner: development
--

CREATE TABLE public.interviews (
    id integer NOT NULL,
    student character varying(255) NOT NULL,
    interviewer_id integer,
    appointment_id integer
);


ALTER TABLE public.interviews OWNER TO development;

--
-- Name: interviews_id_seq; Type: SEQUENCE; Schema: public; Owner: development
--

CREATE SEQUENCE public.interviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.interviews_id_seq OWNER TO development;

--
-- Name: interviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: development
--

ALTER SEQUENCE public.interviews_id_seq OWNED BY public.interviews.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: available_interviewers id; Type: DEFAULT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.available_interviewers ALTER COLUMN id SET DEFAULT nextval('public.available_interviewers_id_seq'::regclass);


--
-- Name: days id; Type: DEFAULT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.days ALTER COLUMN id SET DEFAULT nextval('public.days_id_seq'::regclass);


--
-- Name: interviewers id; Type: DEFAULT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviewers ALTER COLUMN id SET DEFAULT nextval('public.interviewers_id_seq'::regclass);


--
-- Name: interviews id; Type: DEFAULT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviews ALTER COLUMN id SET DEFAULT nextval('public.interviews_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: development
--

COPY public.appointments (id, "time", day_id) FROM stdin;
1	12pm	1
2	1pm	1
3	12pm	2
4	1pm	2
\.


--
-- Data for Name: available_interviewers; Type: TABLE DATA; Schema: public; Owner: development
--

COPY public.available_interviewers (id, day_id, interviewer_id) FROM stdin;
1	1	1
2	1	2
3	2	1
4	2	2
\.


--
-- Data for Name: days; Type: TABLE DATA; Schema: public; Owner: development
--

COPY public.days (id, name) FROM stdin;
1	Monday
2	Tuesday
\.


--
-- Data for Name: interviewers; Type: TABLE DATA; Schema: public; Owner: development
--

COPY public.interviewers (id, name, avatar) FROM stdin;
1	Sylvia Palmer	https://i.imgur.com/LpaY82x.png
2	Tori Malcolm	https://i.imgur.com/Nmx0Qxo.png
\.


--
-- Data for Name: interviews; Type: TABLE DATA; Schema: public; Owner: development
--

COPY public.interviews (id, student, interviewer_id, appointment_id) FROM stdin;
1	Archie Cohen	1	1
\.


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: development
--

SELECT pg_catalog.setval('public.appointments_id_seq', 4, true);


--
-- Name: available_interviewers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: development
--

SELECT pg_catalog.setval('public.available_interviewers_id_seq', 4, true);


--
-- Name: days_id_seq; Type: SEQUENCE SET; Schema: public; Owner: development
--

SELECT pg_catalog.setval('public.days_id_seq', 2, true);


--
-- Name: interviewers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: development
--

SELECT pg_catalog.setval('public.interviewers_id_seq', 2, true);


--
-- Name: interviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: development
--

SELECT pg_catalog.setval('public.interviews_id_seq', 1, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: available_interviewers available_interviewers_pkey; Type: CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.available_interviewers
    ADD CONSTRAINT available_interviewers_pkey PRIMARY KEY (id);


--
-- Name: days days_pkey; Type: CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY (id);


--
-- Name: interviewers interviewers_pkey; Type: CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviewers
    ADD CONSTRAINT interviewers_pkey PRIMARY KEY (id);


--
-- Name: interviews interviews_appointment_id_key; Type: CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_appointment_id_key UNIQUE (appointment_id);


--
-- Name: interviews interviews_pkey; Type: CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_day_id_fkey FOREIGN KEY (day_id) REFERENCES public.days(id) ON DELETE CASCADE;


--
-- Name: available_interviewers available_interviewers_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.available_interviewers
    ADD CONSTRAINT available_interviewers_day_id_fkey FOREIGN KEY (day_id) REFERENCES public.days(id) ON DELETE CASCADE;


--
-- Name: available_interviewers available_interviewers_interviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.available_interviewers
    ADD CONSTRAINT available_interviewers_interviewer_id_fkey FOREIGN KEY (interviewer_id) REFERENCES public.interviewers(id) ON DELETE CASCADE;


--
-- Name: interviews interviews_appointment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE;


--
-- Name: interviews interviews_interviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: development
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_interviewer_id_fkey FOREIGN KEY (interviewer_id) REFERENCES public.interviewers(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

