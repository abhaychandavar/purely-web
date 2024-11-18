FROM node:18 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .


# Set environment variables
ENV NEXT_PUBLIC_AUTH_SERVICE_URL=https://auth.purelyapp.me

FROM base as production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]