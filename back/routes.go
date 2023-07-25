package main

import (
	"todo/todo"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Email")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func routes() {
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/todos", todo.GetTodos)
	r.GET("/todos/:id", todo.GetTodoByID)
	r.POST("/todos", todo.CreateTodo)
	r.PUT("/todos", todo.UpdateTodoTitle)
	r.PUT("/todos/:id/done", todo.ToggleDone)
	r.PUT("/todos/done", todo.CheckTodosDone)
	r.PUT("/todos/:id/important", todo.ToggleImportance)
	r.DELETE("/todos/:id", todo.DeleteTodo)
	r.DELETE("/todos", todo.ClearCompeletedTodos)

	r.Run()
}
