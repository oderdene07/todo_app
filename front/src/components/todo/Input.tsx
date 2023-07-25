import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import apiClient from "@/app/api/apiClient";
import { useSession } from "next-auth/react";

type Props = {
  refresh: () => void;
};

export default function AddTodoInput({ refresh }: Props) {
  const [value, setValue] = useState("");
  const { data: session } = useSession();

  const email = session?.user?.email;

  const addTodo = async (title: string) => {
    await apiClient.post("/todos", {
      user_email: email,
      title: title,
    });
    refresh();
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full h-12 rounded-xl border px-5 py-2 outline-none transition border-none text-white bg-gray-800"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.length !== 0) {
            addTodo(value);
            setValue("");
          }
        }}
        placeholder="Add a new todo..."
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 font-semibold text-gray-700 transition text-white hover:bg-gray-700"
        onClick={() => {
          if (value.length !== 0) {
            addTodo(value);
            setValue("");
          }
        }}
        title="Add a new todo"
      >
        <BsPlus size={28} />
      </button>
    </div>
  );
}
