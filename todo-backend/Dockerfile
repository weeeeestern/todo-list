FROM golang:1.22.5 AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go get -u github.com/gin-gonic/gin
RUN go get -u gorm.io/gorm
RUN go get -u gorm.io/driver/mysql

RUN go build -o /go-todo

FROM alpine:latest

WORKDIR /root/

COPY --from=build /go-todo .

EXPOSE 8080

CMD ["./go-todo"]