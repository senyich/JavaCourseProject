DELETE FROM diagram_parts;
DELETE FROM system_diagrams;
DELETE FROM car_systems;
DELETE FROM parts;
DELETE FROM cars;

-- Автомобили
INSERT INTO cars (id, brand, model, production_year, image_url) VALUES
(1, 'Toyota', 'Camry', 2020, '/static/cars/toyota-camry.jpg'),
(2, 'Honda', 'Accord', 2021, '/static/cars/honda-accord.jpg');

-- Системы для Toyota Camry
INSERT INTO car_systems (id, name, description, icon_url, car_id) VALUES
(1, 'Тормозная система', 'Тормозные колодки, диски, суппорты', '/static/icons/brakes.png', 1),
(2, 'Двигатель', 'Фильтры, свечи, ремни ГРМ', '/static/icons/engine.png', 1);

-- Схемы для тормозной системы
INSERT INTO system_diagrams (id, name, image_url, system_id) VALUES
(1, 'Передние тормоза', '/static/diagrams/toyota/brakes-front.jpg', 1),
(2, 'Задние тормоза', '/static/diagrams/toyota/brakes-rear.jpg', 1);

-- Детали
INSERT INTO parts (id, part_number, name, description, price, quantity, manufacturer) VALUES
(1, 'TKB-001', 'Тормозные колодки передние', 'Комплект передних тормозных колодок', 45.99, 10, 'Brembo'),
(2, 'TKB-002', 'Тормозные колодки задние', 'Комплект задних тормозных колодок', 39.99, 8, 'Brembo'),
(3, 'TKB-003', 'Тормозные диски передние', 'Передние тормозные диски', 89.99, 5, 'Brembo');

-- Связи деталей со схемами
INSERT INTO diagram_parts (diagram_id, part_id) VALUES
(1, 1), (1, 3), (2, 2);