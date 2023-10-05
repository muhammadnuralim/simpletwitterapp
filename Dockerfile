FROM node:18


WORKDIR /frontend


COPY package*.json ./
COPY .env ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 4173


CMD ["npm", "run", "preview"]
