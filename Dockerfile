FROM node:23-alpine AS build
WORKDIR /reactaishoppinglist
COPY package*.json ./
RUN npm i
COPY . .
RUN npx tailwindcss -i ./src/input.css -o ./dist/output.css
RUN npm run build
EXPOSE 4444
CMD ["node", "server/app.js"]
