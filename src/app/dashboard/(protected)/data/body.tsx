"use client";

import { time } from "console";
import { useState } from "react";
import { set } from "zod";

import dummyUsers from "./const";
import SearchBar from "./searchbar";

interface DummyUser {
  mark: boolean;
  status: string;
  email: string;
  bookings: number;
  amount: number;
  event: string;
}

export default function DashboardDataPageBody() {
  const [emailInput, setEmailInput] = useState("");
  const [eventInput, setEventInput] = useState("");
  const [users, setUsers] = useState(dummyUsers);
  const [showAll, setShowAll] = useState(false);

  const mapUser = (user: DummyUser) => {
    return (
      <tr className="w-full text-xs text-center h-10">
        <td className="w-1/12">
          <input className="w-full" type="checkbox" checked={user.mark}></input>
        </td>
        <td className="w-2/12">{user.status}</td>
        <td className="w-4/12">{user.email}</td>
        <td className="w-2/12">{user.bookings}</td>
        <td className="w-3/12">${user.amount}</td>
      </tr>
    );
  };
  const resetUsers = () => {
    setUsers(dummyUsers);
  };

  const filterUsers = (email: string) => {
    resetUsers();
    if (eventInput) {
      setUsers(
        dummyUsers
          .filter((user) => user.email.includes(email))
          .filter((user) => user.event === eventInput),
      );
    } else {
      setUsers(dummyUsers.filter((user) => user.email.includes(email)));
    }
  };

  return (
    <div className="mx-4 mt-2">
      <h1 className="text-4xl font-extrabold">Bookings Data</h1>
      <div className="border-2 rounded-md w-3/5 my-2 flex">
        <select
          className="px-1 py-1 text-s w-3/4 text-sm focus:outline-none"
          value={eventInput}
          onChange={(e) => {
            setEventInput(e.target.value);
            filterUsers(emailInput);
          }}
        >
          <option disabled value="">
            Select an Event
          </option>
          <option value="Event 1">Event 1</option>
          <option value="Event 2">Event 2</option>
        </select>
        <span className="p-1 text-sm w-1/4 text-center border-l-2 px-1 py-1">
          200
        </span>
      </div>

      <SearchBar
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        filterUsers={filterUsers}
        resetUsers={resetUsers}
      />

      <div id="booking-data" className="mt-4">
        <table className="w-full">
          <thead>
            <tr className="w-full font-normal border-b-2 text-sm">
              <th className="w-1/12"></th>
              <th className="w-2/12">Status</th>
              <th className="w-4/12">Email</th>
              <th className="w-2/12">Bookings</th>
              <th className="w-3/12">Amount</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.length <= 5 || showAll ? (
                users.map((user) => mapUser(user))
              ) : (
                users.slice(0, 5).map((user) => mapUser(user))
              )
            ) : (
              <tr className="w-full text-xs text-center h-10">
                <td className="w-full" colSpan={5}>
                  No Booking Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {users.length > 5 && !showAll && (
          <div
            onClick={() => setShowAll(!showAll)}
            className="text-sm w-full text-center mt-3 hover:bg-gray-100 py-4 font-normal"
          >
            Load More
          </div>
        )}
        {users.length > 5 && showAll && (
          <div
            onClick={() => setShowAll(!showAll)}
            className="text-sm w-full text-center mt-3 hover:bg-gray-100 py-4 font-normal"
          >
            Load Less
          </div>
        )}
      </div>
    </div>
  );
}
