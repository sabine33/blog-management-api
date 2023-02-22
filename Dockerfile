FROM node:18-alpine 
ARG DYNAMODB_URL=${DYNAMODB_URL}
RUN mkdir -p /usr/app/blogapi
WORKDIR /usr/app/blogapi
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
# RUN npm install -g yarn
RUN yarn 
COPY . .
RUN yarn build
EXPOSE 4000
CMD [ "yarn","prod"]