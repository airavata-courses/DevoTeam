FROM alpine

RUN apk add --update redis &&\
    apk add curl

CMD redis-server --protected-mode no

EXPOSE 6379
