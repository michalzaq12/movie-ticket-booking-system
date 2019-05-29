FROM node:8-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY src src/
COPY build build/
COPY config config/
COPY index.html ./
COPY .babelrc ./

ARG API_GATEWAY_URL
ENV API_GATEWAY_URL=$API_GATEWAY_URL
RUN echo "-> $API_GATEWAY_URL"


ARG API_GATEWAY_PORT
ENV API_GATEWAY_PORT=$API_GATEWAY_PORT
RUN echo "-> $API_GATEWAY_PORT"

RUN npm run build:all





FROM nginx:stable

COPY --from=build /app/public/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Set the default command to execute
# when creating a new container
CMD service nginx start
