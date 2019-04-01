# Построение приложения по принципу TDD
## Состав
### Сервер
- `node.js`
- `express`

### База данных
- **Postgresql** (`pg`)

### Клиент
- Vue.js (Vue-Router, Vuex)

### Тестирование
- Unit: `Jest`
- Integration: `Supertest` + `Jest`
- e2e: Cypress
---
## Установка
1. Клонировать репозиторий и перейти в соответствующую директорию
2. `npm install` - установка всех зависимостей
3. `npm run test` - запуск интеграционных и unit-тестов
4. `npm run start:dev` - запуск сервера
5. В другом терминале выполнить: `cd client && npm run test:e2e` - запуск e2e тестов (придется подождать, поскольку первый запуск cypress достаточно долгий)
