import { IconType } from "react-icons";
import { BsPencilSquare, BsStar, BsStarFill, BsTrash3 } from "react-icons/bs";
import apiClient from "@/app/api/apiClient";

type TodoProps = {
  todo: Todo;
  setIsDeleteModalOpen: (arg: boolean) => void;
  setIsEditModalOpen: (arg: boolean) => void;
  refresh: () => void;
};

type ModifierIconProps = {
  onClick: () => void;
  Icon: IconType;
};

export default function Todo({
  todo,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  refresh,
}: TodoProps) {
  const { id, is_done, title, is_important } = todo;

  const toggleTodoDone = async (todoID: string) => {
    await apiClient.put(`/todos/${todoID}/done`);
    refresh();
  };

  const toggleImportance = async (todoID: string) => {
    await apiClient.put(`/todos/${todoID}/important`);
    refresh();
  };

  const ModifierIcon = ({ onClick, Icon }: ModifierIconProps) => (
    <button
      className="text-white rounded-full p-2 transition hover:bg-white/10 hover:text-red-300"
      onClick={onClick}
    >
      <Icon size={18} opacity={0.5} />
    </button>
  );

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={is_done}
          className="w-5 h-5 rounded focus:ring-blue-600 ring-offset-gray-800 bg-gray-700 border-gray-600 focus:ring-offset-gray-800"
          onClick={() => toggleTodoDone(id)}
          readOnly
          title={is_done ? "Uncheck the todo" : "Check the todo"}
        />
        <div>
          <h3
            className={`select-none text-lg  ${
              is_done ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1">
        <ModifierIcon
          Icon={BsPencilSquare}
          onClick={() => setIsEditModalOpen(true)}
        />
        <ModifierIcon
          Icon={BsTrash3}
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <button
          className="px-2 transition hover:bg-white/10 hover:text-yellow-500 rounded-full p-2 text-white"
          onClick={() => toggleImportance(id)}
        >
          {is_important ? (
            <BsStarFill size={20} color="#FDCC0D" />
          ) : (
            <BsStar size={20} opacity={0.5} />
          )}
        </button>
      </div>
    </div>
  );
}
