import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import apiClient from "@/app/api/apiClient";

type ModalProps = {
  todoId: string;
  setIsEditModalOpen: (bool: boolean) => void;
  refresh: () => void;
};

export default function EditModal({
  setIsEditModalOpen,
  todoId,
  refresh,
}: ModalProps) {
  const [todo, setTodo] = useState<Todo | undefined>();
  const [newTitle, setNewTitle] = useState("");

  const getTodo = async (todoID: string) => {
    const response = await apiClient.get(`/todos/${todoID}`);
    const data = response.data;
    setTodo(data);
  };

  const editTodo = async (todoID: string, newTitle: string) => {
    await apiClient.put(`/todos`, {
      id: todoID,
      title: newTitle,
    });
    refresh();
  };

  useEffect(() => {
    getTodo(todoId);
  }, [todoId]);

  useEffect(() => {
    const inputBox = document.getElementById("inputBox");
    setNewTitle(todo ? todo?.title : "");
    inputBox?.focus();
  }, [todo]);

  const confirmModal = () => {
    if (newTitle.length !== 0) {
      editTodo(todoId, newTitle);
      setIsEditModalOpen(false);
    }
  };

  const clickOutsideCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const modalParent = document.getElementById("modalParent");
    if (e.target === modalParent) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div
      id="modalParent"
      className="fixed left-0 top-0 z-50 flex h-full w-full animate-fade items-center overflow-auto bg-black/60 animate-normal animate-duration-[150ms] animate-fill-forwards animate-once animate-ease-out"
      onClick={clickOutsideCloseModal}
    >
      <div
        id="editModal"
        className="mx-auto flex w-3/4 max-w-lg -translate-y-1/2 flex-col gap-6 rounded-xl p-6 shadow-2xl bg-gray-800 text-gray-100"
      >
        <div>
          <h3 className="text-center text-lg font-medium">
            Edit and save the todo:
          </h3>
        </div>
        <div className="flex justify-center gap-4 px-5">
          <input
            id="inputBox"
            type="text"
            className="w-full rounded-xl border px-5 py-2 outline-none transition border-none text-white bg-gray-700 focus:bg-gray-600 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTitle.length !== 0) {
                editTodo(todoId, newTitle);
                setIsEditModalOpen(false);
              }
            }}
            placeholder="Add new todo..."
          />
          <button
            className="flex items-center gap-2 rounded bg-slate-500 px-4 py-2 font-medium text-white transition hover:bg-slate-600"
            onClick={confirmModal}
          >
            <BsPencilSquare />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
