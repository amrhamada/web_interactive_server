-- Teachers table seeds here (Example)
INSERT INTO teachers (id, first_name, last_name, email, avatar, password) VALUES 
(1, 'Lera','Hahn','lera_hahn@dickens.org','https://i.imgur.com/LpaY82x.png','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
(2, 'Andre','Homenick','andre@mail.ca','https://i.imgur.com/Nmx0Qxo.png','$2b$10$3bVZCzLy2/9d9Al9tIhTe.7AezvGPohGkmOH3frHPEamCCtMbovy.'),
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
(4, 'Math'),
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

INSERT INTO games (id, grade_id, subject_id, type_id, teacher_id, level_id) VALUES
(1, 1, 4, 1, 2, 1),
(2, 1, 4, 1, 2, 2),
(3, 1, 1, 1, 2, 3);

INSERT INTO game_images (id, game_id, image) VALUES
(1, 1, 'https://i.imgur.com/3jRQIkk.png'),
(2, 1, 'https://i.imgur.com/tZlcXH3.png'),
(3, 1, 'https://i.imgur.com/wvzNHEy.png'),
(4, 1, 'https://i.imgur.com/h61Ih2R.png'),
(5, 2, 'https://i.imgur.com/vWUomyl.png'),
(6, 2, 'https://i.imgur.com/dE58Scr.png'),
(7, 2, 'https://i.imgur.com/qAUlof1.png'),
(8, 2, 'https://i.imgur.com/GW08WYY.png'),
(9, 2, 'https://i.imgur.com/d6MUltZ.png'),
(10, 2, 'https://i.imgur.com/bCA6yKg.png'),
(11, 3, 'https://i.imgur.com/j7Cv2DD.png'),
(12, 3, 'https://i.imgur.com/rdg7ALz.png'),
(13, 3, 'https://i.imgur.com/KPBmt5v.png'),
(14, 3, 'https://i.imgur.com/fJZeY1m.png'),
(15, 3, 'https://i.imgur.com/PZmnc6c.png'),
(16, 3, 'https://i.imgur.com/UhFyDuK.png'),
(17, 3, 'https://i.imgur.com/op8sQHl.png'),
(18, 3, 'https://i.imgur.com/oOPaSc5.png');

INSERT INTO game_info (id, game_id, title, description) VALUES
(1, 1, 'Counting','Recognizing quantities '),
(2, 2, 'Association','Quantities in the fishbowl'),
(3, 3, 'Animals','Find the animals');

ALTER SEQUENCE teachers_id_seq RESTART WITH 11;
ALTER SEQUENCE grades_id_seq RESTART WITH 4;
ALTER SEQUENCE subjects_id_seq RESTART WITH 7;
ALTER SEQUENCE levels_id_seq RESTART WITH 4;
ALTER SEQUENCE levels_id_seq RESTART WITH 5;
ALTER SEQUENCE games_id_seq RESTART WITH 4;
ALTER SEQUENCE game_images_id_seq RESTART WITH 19;
ALTER SEQUENCE game_info_id_seq RESTART WITH 4;