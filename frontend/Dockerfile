FROM node:18.12.1 as builder

RUN mkdir /build
WORKDIR /build

# install build depedencies
COPY package*.json .
RUN npm install

# copy source code and other files
COPY . .

ENV NODE_ENV production

# build the app
RUN npm run build-only

# build nginx container
FROM nginx:1.23.2

# copy builded files
COPY --from=builder /build/dist /usr/share/nginx/html

# copy nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# add custom entrypoint to replace API_BACKEND_HOST at runtime
COPY entrypoint.sh /docker-entrypoint/entrypoint.sh
RUN chmod +x /docker-entrypoint/entrypoint.sh

ENTRYPOINT ["/docker-entrypoint/entrypoint.sh"]
