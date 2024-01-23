"use client";

import { Fragment, useState } from "react";
import { FiTrash } from "react-icons/fi";

import { api } from "@/lib/trpc/client";

import BookingsTableRow from "./bookings-table-row";
import dummyUsers from "./const";
import SearchBar from "./searchbar";

export default function DashboardDataPageBody() {
  const [emailInput, setEmailInput] = useState("");
  const [eventInput, setEventInput] = useState("");
  const [users, setUsers] = useState(dummyUsers);
  const [showAll, setShowAll] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const { data, error, fetchNextPage, isLoading, isError } =
    api.booking.getAllEmails.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 0,
      },
    );

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

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
          {eventInput ? users.length : 0}
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
            {data.pages.length ? (
              data.pages.flatMap((page, idx) =>
                page.emails.map((email) => (
                  <BookingsTableRow
                    key={`${idx}-${email}`}
                    email={email}
                    onChange={() => {
                      console.log("onChange triggered");
                    }}
                  />
                )),
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

      <div
        className="bg-[#EF4444] w-16 h-16 rounded-full fixed left-[80vw] top-[80vh] flex items-center justify-center hover:bg-gtd-red-primary-bright"
        onClick={() => {
          setShowPopUp(true);
        }}
      >
        <FiTrash className="text-white w-10 h-10" />
      </div>

      {showPopUp && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black opacity-50"
          onClick={() => setShowPopUp(false)}
        ></div>
      )}

      {showPopUp && (
        <div className="fixed left-[10%] top-1/3 border-[1px] rounded-md w-4/5 h-36 bg-white flex-col flex p-4">
          <div className="font-semibold text-[2.8vw]">
            Invalidate bookings by username@gmail.com?
          </div>
          <div className="text-[2.45vw] my-2 h-2/3 text-gray-500 font-light">
            This action cannot be undone. This will permanently invalidate
            bookings made by username@gmail.com
          </div>
          <div className="flex justify-end">
            <div
              className="border-[1px] rounded-md py-2 px-3 text-[2.45vw] mx-2 hover:bg-gray-100"
              onClick={() => setShowPopUp(false)}
            >
              Cancel
            </div>
            <div className="border-[1px] rounded-md bg-red-500 text-white py-2 text-[2.45vw] px-3 hover:bg-red-600">
              Invalidate
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
