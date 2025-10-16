Документация к бэкенду:
Главное меню
```bash

curl -X GET "http://localhost:8080/api/catalog/cars"
```
Страница автомобиля
```bash

# Получить информацию об автомобиле
curl -X GET "http://localhost:8080/api/catalog/cars/1"

# Получить системы автомобиля
curl -X GET "http://localhost:8080/api/catalog/cars/1/systems"
```
Страница системы
```bash

# Получить диаграмму системы
curl -X GET "http://localhost:8080/api/catalog/diagrams/1"
```
Поиск
```bash
# Поиск деталей
curl -X GET "http://localhost:8080/api/catalog/parts/TKB-001"
```
Добавление авто
```bash
curl -X POST "http://localhost:8080/api/admin/cars" \
  -H "Content-Type: application/json" \
  -d "{\"brand\": \"Toyota\", \"model\": \"Camry\", \"productionYear\": 2020, \\"imageUrl\": \"/static/cars/toyota-camry.jpg\"}"
```