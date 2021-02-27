FROM postgres:latest

ENV POSTGRES_PASSWORD=pass
ENV POSTGRES_HOST_AUTH_METHOD=trust
ENV POSTGRES_USER=andreibadoi
ENV POSTGRES_DB=db-react

COPY create.sql /docker-entrypoint-initdb.d/create.sql
