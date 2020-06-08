-- Teachers table seeds here (Example)
INSERT INTO teachers (id, first_name, last_name, email, avatar, password) VALUES 
(1, 'Lera','Hahn','lera_hahn@dickens.org','https://i.imgur.com/LpaY82x.png','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(2, 'Darius','Homenick','darius.homenick@tod.ca','https://i.imgur.com/Nmx0Qxo.png','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(3, 'Mcdermott','Maxie','mcdermott.maxie@schoen.com','https://i.imgur.com/T2WwVfS.png','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(4, 'Derrick','Pollich','derrick.pollich@gmail.com','https://i.imgur.com/FK8V841.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(5, 'Ebba','Deckow','ebba.deckow@yahoo.com','https://i.imgur.com/twYrpay.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(6, 'Miguel','Barrows','miguel.barrows@yahoo.com','https://i.imgur.com/TdOAdde.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(7, 'Alysha','Daniel','alysha.daniel@boyer.tv','https://i.imgur.com/3tVgsra.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(8, 'Bradtke','Mallie','bradtke.mallie@yahoo.com','https://i.imgur.com/iHq8K8Z.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(9, 'Kattie','Dibbert','kattie.dibbert@winnifred.name','https://i.imgur.com/nPywAp1.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(10, 'Elisha','Wisoky','elisha.wisoky@gmail.com','https://i.imgur.com/okB9WKC.jpg','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.');

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

INSERT INTO games (id, grade_id, subject_id, types_id, teacher_id, level_id) VALUES
(1, 1, 4, 1, 2, 1),
(2, 1, 4, 1, 2, 2),
(3, 1, 1, 1, 2, 3);

INSERT INTO game_images (id, game_id, image) VALUES
(1, 1, 'https://imgur.com/3jRQIkk'),
(2, 1, 'https://imgur.com/tZlcXH3'),
(3, 1, 'https://imgur.com/wvzNHEy'),
(4, 1, 'https://imgur.com/h61Ih2R'),
(5, 2, 'https://imgur.com/vWUomyl'),
(6, 2, 'https://imgur.com/dE58Scr'),
(7, 2, 'https://imgur.com/qAUlof1'),
(8, 2, 'https://imgur.com/GW08WYY'),
(9, 2, 'https://imgur.com/d6MUltZ'),
(10, 2, 'https://imgur.com/bCA6yKg'),
(11, 3, 'https://imgur.com/Z9urASO'),
(12, 3, 'https://imgur.com/oE2aeEf'),
(13, 3, 'https://imgur.com/1nipnkq'),
(14, 3, 'https://imgur.com/Y0b45XF'),
(15, 3, 'https://imgur.com/1K8AKhI'),
(16, 3, 'https://imgur.com/Qz7IX3x'),
(17, 3, 'https://imgur.com/I9zmFor'),
(18, 3, 'https://imgur.com/euq78Fz');

INSERT INTO game_info (id, game_id, title, description) VALUES
(1, 1, 'how many fingers','numbers with fingers'),
(2, 2, 'how many fishes','numbers in fishbowl'),
(3, 3, 'vowels','find the vowels');

ALTER SEQUENCE teachers_id_seq RESTART WITH 11;
ALTER SEQUENCE grades_id_seq RESTART WITH 4;
ALTER SEQUENCE subjects_id_seq RESTART WITH 7;
ALTER SEQUENCE levels_id_seq RESTART WITH 4;
ALTER SEQUENCE levels_id_seq RESTART WITH 5;
ALTER SEQUENCE games_id_seq RESTART WITH 3;
ALTER SEQUENCE game_images_id_seq RESTART WITH 19;
ALTER SEQUENCE game_info_id_seq RESTART WITH 4;