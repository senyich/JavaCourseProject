-- Очистка таблиц (если нужно)
DELETE FROM diagram_parts;
DELETE FROM diagrams;
DELETE FROM sub_groups;
DELETE FROM part_groups;
DELETE FROM vehicle_groups;
DELETE FROM vehicles;
DELETE FROM oem_parts;

-- Тестовые автомобили (Frame номера)
INSERT INTO vehicles (frame, brand, model, year) VALUES
('L048G-3004771', 'Mitsubishi', 'Pajero', 1995),
('V73W-0000123', 'Mitsubishi', 'Pajero', 2000),
('V93W-0000456', 'Mitsubishi', 'Pajero', 2005);

-- Группы запчастей
INSERT INTO part_groups (id, name, description) VALUES
(1, 'Рама', 'Элементы рамы и кузова'),
(2, 'Двигатель', 'Двигатель и его компоненты'),
(3, 'Подвеска', 'Подвеска и рулевое управление'),
(4, 'Трансмиссия', 'КПП, раздатка, карданы');

-- Подгруппы
INSERT INTO sub_groups (id, name, description, group_id) VALUES
(1, 'Рама и крепления кузова', 'Кронштейны, усилители', 1),
(2, 'Поперечины рамы', 'Поперечные элементы рамы', 1),
(3, 'Блок двигателя', 'Блок цилиндров, головка', 2),
(4, 'Система охлаждения', 'Радиатор, патрубки', 2);

-- Привязка групп к Frame
INSERT INTO vehicle_groups (frame, group_id) VALUES
('L048G-3004771', 1),
('L048G-3004771', 2),
('V73W-0000123', 1),
('V73W-0000123', 3);

-- OEM номера
INSERT INTO oem_parts (id, oem_number, name, description) VALUES
(1, 'MB123456', 'Кронштейн рамы передний правый', 'Оригинальный кронштейн'),
(2, 'MB123457', 'Кронштейн рамы передний левый', 'Оригинальный кронштейн'),
(3, 'MB123458', 'Усилитель рамы', 'Усилитель лонжерона');

-- Схемы
INSERT INTO diagrams (id, name, image_url, description, sub_group_id) VALUES
(1, 'Схема рамы L048G', '/uploads/diagrams/frame-l048g.jpg', 'Основные элементы рамы', 1);

-- Привязка деталей к схеме
INSERT INTO diagram_parts (id, diagram_id, oem_part_id, position_x, position_y, label, description) VALUES
(1, 1, 1, 150, 200, '1', 'Передний правый кронштейн'),
(2, 1, 2, 300, 200, '2', 'Передний левый кронштейн'),
(3, 1, 3, 225, 300, '3', 'Центральный усилитель');