import "client-only";

import { Delete } from "lucide-react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({
  emailInput,
  setEmailInput,
  resetUsers,
}: {
  emailInput: string;
  setEmailInput: (email: string | ((prevEmail: string) => string)) => void;
  resetUsers: () => void;
}) {
  return (
    <div className="flex mt-4 border border-slate-300 rounded-md">
      <div className="flex items-center p-3 rounded-md">
        <IoSearch className="" />
      </div>
      <input
        className="text-sm grow outline-none"
        placeholder="Search Email"
        value={emailInput}
        onInput={(e) => setEmailInput(e.currentTarget.value)}
      />
      <button
        className="flex items-center p-3 hover:bg-gray-100 rounded-md"
        onClick={() => {
          resetUsers();
        }}
      >
        <Delete className="size-4" />
      </button>
    </div>
  );
}
