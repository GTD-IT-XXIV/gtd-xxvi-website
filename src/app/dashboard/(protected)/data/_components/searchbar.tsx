"use client";

import { CiEraser } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({
  emailInput,
  setEmailInput,
  filterUsers,
  resetUsers,
}: {
  emailInput: string;
  setEmailInput: (email: string | ((prevEmail: string) => string)) => void;
  filterUsers: (email: string) => void;
  resetUsers: () => void;
}) {
  return (
    <div className="flex mt-4 border-2 rounded-md">
      <button className="flex items-center px-2 hover:bg-gray-100 py-2 rounded-md">
        <IoSearch className="" />
      </button>
      <input
        className="text-sm w-full outline-none"
        placeholder="Search Email"
        value={emailInput}
        onInput={(e) => {
          setEmailInput(e.currentTarget.value);
          filterUsers(e.currentTarget.value);
        }}
      ></input>
      <button
        className="flex items-center px-2 hover:bg-gray-100 py-2 rounded-md"
        onClick={() => {
          resetUsers();
          setEmailInput("");
        }}
      >
        <CiEraser className="" />
      </button>
    </div>
  );
}
