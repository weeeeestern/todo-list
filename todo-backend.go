package main

import (
	"fmt"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Todo struct {
	ID          uint      `gorm:"primaryKey"`
	Title       string    `json:"title"`
	IsCompleted bool      `json:"is_completed"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

var db *gorm.DB
var err error

func init() {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"))

	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
}

func main() {
	r := gin.Default()

	r.GET("/todo", GetTodos)
	r.GET("/todo/:id", GetTodo)
	r.POST("/todo", CreateTodo)
	r.PUT("/todo/:id", UpdateTodo)
	r.DELETE("/todo/:id", DeleteTodo)

	r.Run()
}

func GetTodos(c *gin.Context) {
	var todos []Todo
	if err := db.Find(&todos).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, todos)
}

func GetTodo(c *gin.Context) {
	var todo Todo
	id := c.Param("id")
	if err := db.First(&todo, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Todo not found"})
		return
	}
	c.JSON(200, todo)
}

func CreateTodo(c *gin.Context) {
	var todo Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&todo).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, todo)
}

func UpdateTodo(c *gin.Context) {
	var todo Todo
	id := c.Param("id")
	if err := db.First(&todo, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Todo not found"})
		return
	}
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&todo).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, todo)
}

func DeleteTodo(c *gin.Context) {
	var todo Todo
	id := c.Param("id")
	if err := db.First(&todo, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Todo not found"})
		return
	}
	if err := db.Delete(&todo).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Todo deleted", "id": id})
}
