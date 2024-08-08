FROM golang:1.22.5

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

RUN go get -u github.com/gin-gonic/gin
RUN go get -u gorm.io/gorm
RUN go get -u gorm.io/driver/mysql
RUN go get -u github.com/gin-contrib/cors

COPY . .

RUN go build -o /go-todo


EXPOSE 8080

CMD ["/go-todo"]