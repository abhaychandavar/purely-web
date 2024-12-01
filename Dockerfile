FROM node:18 as base

WORKDIR /app

COPY package*.json ./

RUN npm i --force

COPY . .

ENV NEXT_PUBLIC_AUTH_SERVICE_URL=https://api-auth.purelyapp.me
ENV NEXT_PUBLIC_APP_ENV=PROD
ENV NEXT_PUBLIC_BASE_URL=https://purelyapp.me
ENV NEXT_PUBLIC_AUTH_SERVICE_URL=https://api-auth.purelyapp.me
ENV NEXT_PUBLIC_PROFILES_SERVICE_URL=https://api-profiles.purelyapp.me
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyASRVQmrE0ffUQYiaEaDcmWqvYSex9WTDY

FROM base as production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]