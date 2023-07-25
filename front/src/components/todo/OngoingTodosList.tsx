import { useState } from "react";
import { MdDoneAll } from "react-icons/md";
import Modal from "../modal/Modal";
import TodoCard from "./TodoCard";
import apiClient from "@/app/api/apiClient";

type Props = {
  todos: Todo[] | undefined;
  refresh: () => void;
};

export default function OngoingTodosList({ todos, refresh }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkTodosDone = async () => {
    await apiClient.put("/todos/done");
    refresh();
  };

  const undoneTodosCount = todos?.filter((todo) => !todo.is_done).length;
  const modalMessage = "Mark each todo as completed?";

  return (
    <section>
      {isModalOpen && (
        <Modal
          message={modalMessage}
          confirmFn={checkTodosDone}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {undoneTodosCount === 0 && (
        <h2 className="mt-8 animate-fade-down select-none text-center text-lg font-medium capitalize animate-normal animate-duration-200 animate-fill-both animate-once animate-ease-out text-white">
          😎 There is nohting to do!
        </h2>
      )}
      {undoneTodosCount !== 0 && (
        <article className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2">
            <h2 className="text-lg font-medium text-white">Ongoing Todos</h2>
            <button
              title="Clear Completed Todos"
              onClick={() => setIsModalOpen(true)}
              className="text-white"
            >
              <MdDoneAll size={24} />
            </button>
          </div>
          <div className="max-h-330 flex flex-col gap-2 overflow-scroll">
            {todos?.map((todo) => {
              if (!todo.is_done && todo.is_important) {
                return <TodoCard key={todo.id} refresh={refresh} todo={todo} />;
              }
            })}
            {todos?.map((todo) => {
              if (!todo.is_done && !todo.is_important) {
                return <TodoCard key={todo.id} refresh={refresh} todo={todo} />;
              }
            })}
          </div>
        </article>
      )}
    </section>
  );
}
