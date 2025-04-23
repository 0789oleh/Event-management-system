# Используем официальный Node.js образ
FROM node:18

RUN mkdir -p /app/dist && chown -R node:node /app/dist

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "start:dev"]
