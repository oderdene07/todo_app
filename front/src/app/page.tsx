"use client";
import { useEffect, useState } from "react";

import AddTodoInput from "@/components/todo/Input";
import CompletedTodosList from "@/components/todo/CompletedTodosList";
import OngoingTodosList from "@/components/todo/OngoingTodosList";
import AppBar from "@/components/AppBar";
import { useSession } from "next-auth/react";
import apiClient from "./api/apiClient";

export default function Home() {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const { data: session, status } = useSession({
    required: true,
  });

  const getTodos = async () => {
    const response = await apiClient.get("/todos");
    const data = response.data;
    setTodos(data);
  };

  const refresh = () => {
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  const username = session?.user?.name || "Anonymous";

  const isAnyCompletedTodo = todos?.filter((todo) => todo.is_done).length !== 0;

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="h-screen bg-gray-900">
      <AppBar username={username} />
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Todo App
        </h1>
        <AddTodoInput refresh={refresh} />
        <OngoingTodosList todos={todos} refresh={refresh} />
        {isAnyCompletedTodo && (
          <CompletedTodosList todos={todos} refresh={refresh} />
        )}
      </div>
    </div>
  );
}
