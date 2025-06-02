# Используем официальный образ Node.js
FROM node:18 AS build


# # Принимаем аргументы
# ARG VITE_API_URL
# ARG VITE_API_PORT
# ARG VITE_TEST_ENV

# # Устанавливаем переменные окружения для сборки
# ENV VITE_API_URL=$VITE_API_URL
# ENV VITE_API_PORT=$VITE_API_PORT
# ENV VITE_TEST_ENV=$VITE_TEST_ENV



# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Используем легковесный образ Nginx для сервинга статики
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]