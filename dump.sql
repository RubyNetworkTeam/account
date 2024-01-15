--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 15.2 (Ubuntu 15.2-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: Rubies
--

CREATE TABLE public.accounts (
    pid integer,
    mii_data character varying(256),
    nnid character varying(16),
    screen_name character varying(16),
    gender character varying(1),
    birth_date character varying(255),
    create_date character varying(19),
    email character varying(255),
    country character varying(10),
    utc_offset integer,
    language character varying(10),
    mii_url character varying(255),
    tz_name character varying(255),
    update_time character varying(255),
    region integer,
    servicetoken character varying(255),
    password character varying(255),
    last_accessed character varying(255)
);


ALTER TABLE public.accounts OWNER TO "Rubies";

--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: Rubies
--

COPY public.accounts (pid, mii_data, nnid, screen_name, gender, birth_date, create_date, email, country, utc_offset, language, mii_url, tz_name, update_time, region, servicetoken, password, last_accessed) FROM stdin;
1	AwAAQEp1suGiJbAC3DXFNXg5ODM4EQAAomNOAG8AUABuAGkAZAAAAAAAAAAAAGIqAJBCARFoRBgpFEYUgRIXaA0AACkAUkhUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPfy	PokeyManatee4Alt	Landon Cates	M	17041	17041	l@g.c	US	0	en	http://mii.wuhuisland.xyz/mii/1/standard.tga	America/New_York	1704	822083584	newToken	35eaedcfae8658cf8e509d31856fc9595ac7e30ff047f266abe2c61e925cc48b	\N
2	undefined	kitkattosharktes	undefined	M	1990-01-01	\N	undefined	US	0	en	http://mii.wuhuisland.xyz/mii/2/standard.tga	America/New_York	1990-01-01	822083584	\N	321490f7d76c90f1473b4e2f65851534b8bd04322bcf039d8a35e270e304d3d8	\N
\.


--
-- PostgreSQL database dump complete
--

