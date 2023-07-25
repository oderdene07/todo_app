package todo

import "time"

type Todo struct {
	ID          int64     `json:"id"`
	UserEmail   string    `json:"user_email"`
	Title       string    `json:"title"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	IsImportant bool      `json:"is_important"`
	IsDone      bool      `json:"is_done"`
}
