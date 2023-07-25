import { useState } from "react";
import EditModal from "../modal/EditModal";
import Modal from "../modal/Modal";
import Todo from "./Todo";
import apiClient from "@/app/api/apiClient";

type Props = {
  todo: Todo;
  refresh: () => void;
};

export default function TodoCard({ todo, refresh }: Props) {
  const { id } = todo;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteTodo = async (todoID: string) => {
    await apiClient.delete(`/todos/${todoID}`);
    refresh();
  };

  const modalDeleteMessage = "Do you really want to remove this todo?";

  return (
    <div className="flex flex-col rounded-md border p-4 shadow-sm transition hover:shadow-md border-gray-600">
      {isDeleteModalOpen && (
        <Modal
          message={modalDeleteMessage}
          confirmFn={() => deleteTodo(id)}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          setIsEditModalOpen={setIsEditModalOpen}
          todoId={id}
          refresh={refresh}
        />
      )}

      <Todo
        todo={todo}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        refresh={refresh}
      />
    </div>
  );
}
