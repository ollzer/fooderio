FROM node:16.15.0-alpine as build

WORKDIR /usr/src/fooderio
ENV PATH /usr/src/fooderio/node_modules/.bin:$PATH

ARG VERSION
RUN echo $VERSION
ENV REACT_APP_VERSION_PROD=$VERSION

COPY . .
RUN npm install --production
RUN npm install react-scripts -g
RUN npm run build

FROM nginx:1.17.8-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/fooderio/build /usr/share/nginx/html