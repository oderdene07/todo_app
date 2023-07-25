package todo

import (
	"todo/app"
)

func getTodos(userEmail string) ([]*Todo, error) {
	todos := []*Todo{}

	query := "SELECT id, user_email, title, created_at, updated_at, is_important, is_done FROM todo WHERE user_email = $1"
	rows, err := app.DB.Query(query, userEmail)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		todo := &Todo{}
		err := rows.Scan(&todo.ID, &todo.UserEmail, &todo.Title, &todo.CreatedAt, &todo.UpdatedAt, &todo.IsImportant, &todo.IsDone)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	return todos, nil
}

func createTodo(todo *Todo) error {
	query := "INSERT INTO todo (user_email, title) VALUES ($1, $2)"
	_, err := app.DB.Exec(query, todo.UserEmail, todo.Title)

	if err != nil {
		return err
	}

	return nil
}

func updateTodoTitle(todo *Todo) error {
	query := "UPDATE todo SET title = $1, updated_at = NOW() WHERE id = $2"
	_, err := app.DB.Exec(query, todo.Title, todo.ID)

	if err != nil {
		return err
	}

	return nil
}

func updateTodoIsImportant(todo *Todo) error {
	query := "UPDATE todo SET is_important = $1, updated_at = NOW() WHERE id = $2"
	_, err := app.DB.Exec(query, todo.IsImportant, todo.ID)

	if err != nil {
		return err
	}

	return nil
}

func updateTodoIsDone(todo *Todo) error {
	query := "UPDATE todo SET is_done = $1, updated_at = NOW() WHERE id = $2"
	_, err := app.DB.Exec(query, todo.IsDone, todo.ID)

	if err != nil {
		return err
	}

	return nil
}

func deleteTodo(id int64) error {
	query := "DELETE FROM todo WHERE id = $1"
	_, err := app.DB.Exec(query, id)

	if err != nil {
		return err
	}

	return nil
}

func getTodoByID(id int64) (*Todo, error) {
	todo := &Todo{}

	query := "SELECT id, user_email, title, created_at, updated_at, is_important, is_done FROM todo WHERE id = $1"
	err := app.DB.QueryRow(query, id).Scan(&todo.ID, &todo.UserEmail, &todo.Title, &todo.CreatedAt, &todo.UpdatedAt, &todo.IsImportant, &todo.IsDone)

	if err != nil {
		return nil, err
	}

	return todo, nil
}

func clearCompeletedTodos(userEmail string) error {
	query := "DELETE FROM todo WHERE user_email = $1 AND is_done = true"
	_, err := app.DB.Exec(query, userEmail)

	if err != nil {
		return err
	}

	return nil
}

func checkTodosDone(userEmail string) error {
	query := "UPDATE todo SET is_done = true, updated_at = NOW() WHERE user_email = $1 AND is_done = false"
	_, err := app.DB.Exec(query, userEmail)

	if err != nil {
		return err
	}

	return nil
}
