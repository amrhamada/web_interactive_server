-- Teachers table seeds here (Example)
INSERT INTO teachers (id, first_name, last_name, email, avatar, password) VALUES 
(1, 'Lera','Hahn','lera_hahn@dickens.org','https://i.imgur.com/LpaY82x.png','!@#45zaq'),
(2, 'Darius','Homenick','darius.homenick@tod.ca','https://i.imgur.com/Nmx0Qxo.png','!@#45zaq'),
(3, 'Mcdermott','Maxie','mcdermott.maxie@schoen.com','https://i.imgur.com/T2WwVfS.png','!@#45zaq'),
(4, 'Derrick','Pollich','derrick.pollich@gmail.com','https://i.imgur.com/FK8V841.jpg','!@#45zaq'),
(5, 'Ebba','Deckow','ebba.deckow@yahoo.com','https://i.imgur.com/twYrpay.jpg','!@#45zaq'),
(6, 'Miguel','Barrows','miguel.barrows@yahoo.com','https://i.imgur.com/TdOAdde.jpg','!@#45zaq'),
(7, 'Alysha','Daniel','alysha.daniel@boyer.tv','https://i.imgur.com/3tVgsra.jpg','!@#45zaq'),
(8, 'Bradtke','Mallie','bradtke.mallie@yahoo.com','https://i.imgur.com/iHq8K8Z.jpg','!@#45zaq'),
(9, 'Kattie','Dibbert','kattie.dibbert@winnifred.name','https://i.imgur.com/nPywAp1.jpg','!@#45zaq'),
(10, 'Elisha','Wisoky','elisha.wisoky@gmail.com','https://i.imgur.com/okB9WKC.jpg','!@#45zaq');

INSERT INTO grades (id, name) VALUES 
(1, 'Preschool'),
(2, 'Pre-Kindergarten'),
(3, 'Kindergarten');

INSERT INTO subjects (id, name) VALUES 
(1, 'Language'),
(2, 'Science'),
(3, 'Arts'),
(4, 'Maths'),
(5, 'Music'),
(6, 'Social and Emotional');

INSERT INTO levels (id, name) VALUES 
(1, 'Easy'),
(2, 'Medium'),
(3, 'Hard');

INSERT INTO types (id, name) VALUES 
(1, 'Memory'),
(2, 'Puzzle'),
(3, 'Match'),
(4, 'Sorting');

ALTER SEQUENCE teachers_id_seq RESTART WITH 11;
ALTER SEQUENCE grades_id_seq RESTART WITH 4;
ALTER SEQUENCE subjects_id_seq RESTART WITH 7;
ALTER SEQUENCE levels_id_seq RESTART WITH 4;
ALTER SEQUENCE levels_id_seq RESTART WITH 5;