FROM golang:1.22.5

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

RUN apt-get update && apt-get install -y netcat-openbsd
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

COPY . .

RUN go build -o /go-todo


EXPOSE 8080

CMD ["/go-todo"]