import { useState } from "react";
import { MdClearAll } from "react-icons/md";
import Modal from "../modal/Modal";
import TodoCard from "./TodoCard";
import apiClient from "@/app/api/apiClient";

type Props = {
  todos: Todo[] | undefined;
  refresh: () => void;
};

export default function CompletedTodosList({ todos, refresh }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearCompeletedTodos = async () => {
    await apiClient.delete("/todos");
    refresh();
  };

  const modalMessage = "Clear all completed todos?";

  return (
    <section className="flex flex-col gap-2">
      {isModalOpen && (
        <Modal
          message={modalMessage}
          confirmFn={clearCompeletedTodos}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="flex items-center justify-between p-2">
        <h2 className="select-none text-lg font-medium text-white">
          Completed Todos
        </h2>
        <div className="flex items-center text-white">
          <button
            onClick={() => setIsModalOpen(true)}
            title="Clear Completed Todos"
          >
            <MdClearAll size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-h-330 overflow-scroll">
        {todos?.map((todo) => {
          if (todo.is_done) {
            return <TodoCard key={todo.id} refresh={refresh} todo={todo} />;
          }
        })}
      </div>
    </section>
  );
}
