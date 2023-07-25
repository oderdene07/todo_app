import { signOut } from "next-auth/react";
import Image from "next/image";
import { FunctionComponent } from "react";

interface AppBarProps {
  username: string;
}

const AppBar: FunctionComponent<AppBarProps> = (props: AppBarProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 mx-auto">
      <div className="w-11 h-11 relative ">
        <Image src="/logo.svg" alt="Logo" fill />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-md mr-5 text-white">Hello, {props.username}</p>
        <button
          className=" flex bg-blue-500 hover:bg-blue-700 p-2 rounded"
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }
        >
          <svg
            fill="#fff"
            height="18px"
            width="18px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384.971 384.971"
          >
            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"></path>{" "}
            <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"></path>{" "}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppBar;
