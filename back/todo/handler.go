package todo

import (
	"log"
	"net/http"
	"strconv"
	"todo/app"

	"github.com/gin-gonic/gin"
)

func GetTodos(c *gin.Context) {
	userEmail := c.GetHeader("Email")
	log.Println("Email:", userEmail)
	todos, err := getTodos(userEmail)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", todos)
}

func GetTodoByID(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	todo, err := getTodoByID(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", todo)
}

func CreateTodo(c *gin.Context) {
	var todo Todo
	err := c.BindJSON(&todo)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = createTodo(&todo)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func UpdateTodoTitle(c *gin.Context) {
	var todo Todo
	err := c.BindJSON(&todo)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = updateTodoTitle(&todo)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func DeleteTodo(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = deleteTodo(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func ToggleDone(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	todo, err := getTodoByID(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	todo.IsDone = !todo.IsDone
	err = updateTodoIsDone(todo)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func ToggleImportance(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	todo, err := getTodoByID(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	todo.IsImportant = !todo.IsImportant
	err = updateTodoIsImportant(todo)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func ClearCompeletedTodos(c *gin.Context) {
	userEmail := c.GetHeader("Email")
	err := clearCompeletedTodos(userEmail)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func CheckTodosDone(c *gin.Context) {
	userEmail := c.GetHeader("Email")
	err := checkTodosDone(userEmail)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}
