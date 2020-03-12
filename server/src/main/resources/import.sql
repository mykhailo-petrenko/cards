INSERT INTO public.users (id, active, name, email, password) VALUES (1, true, 'Michal', 'mikael.petrenko@gmail.com', '$2a$10$TloiHkLc6gqti0lo5HULDOUKsPDvIeLCgVfo8gGWR3msvOom5pLn6');
INSERT INTO public.user_role (user_id, roles) VALUES (1, 'USER');

INSERT INTO public.card (id, answer, created, question) VALUES (1, 'A1 2^1', now(), 'Q1 2');
INSERT INTO public.card (id, answer, created, question) VALUES (2, 'A2 2^2', now(), 'Q2 4');
INSERT INTO public.card (id, answer, created, question) VALUES (3, 'A3 2^3', now(), 'Q3 8');
INSERT INTO public.card (id, answer, created, question) VALUES (4, 'A4 2^4', now(), 'Q4 16');
