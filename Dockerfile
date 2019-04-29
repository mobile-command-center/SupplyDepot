FROM nginx:1.15-alpine

ENV NGINX_CONF_PATH /etc/nginx/conf.d
ENV NGINX_ROOT_PATH /var/www/ajungweb.co.kr

# nginx 아래의 모든 파일을 /etc/nginx/conf.d 아래로 복사
RUN rm -f ${NGINX_CONF_PATH}/default.conf
COPY nginx ${NGINX_CONF_PATH}

# public 아래의 모든 파일을 /var/www/ajungweb.co.kr 아래로 복사
COPY public ${NGINX_ROOT_PATH}

# Expose ports.
EXPOSE 80
EXPOSE 443