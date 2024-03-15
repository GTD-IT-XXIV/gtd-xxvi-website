"use client";

import Fuse from "fuse.js";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";

import { api } from "@/lib/trpc/client";

import BookingsTableRow from "./bookings-table-row";
import DashboardDataSelect from "./dashboard-data-select";
import SearchBar from "./search-bar";

export default function DashboardDataPageBody() {
  const [emailInput, setEmailInput] = useState("");
  const [eventInput, setEventInput] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<Record<string, boolean>>(
    {},
  );

  const { data, fetchNextPage, hasNextPage, isPending, isError } =
    api.booking.getAllEmails.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!eventInput,
      },
    );

  const emails =
    data?.pages.flatMap((page) => page.emails.map((email) => email)) ?? [];
  const fuse = new Fuse<string>(emails);
  const filteredEmails = emailInput
    ? fuse.search(emailInput).map(({ item }) => item)
    : emails;

  const emailsSelected = Object.entries(selectedEmails)
    .filter(([_, selected]) => selected)
    .map(([email]) => email);

  return (
    <div className="mx-4 mt-6">
      <h1 className="text-4xl font-extrabold">Bookings Data</h1>
      <DashboardDataSelect
        selectedEvent={eventInput}
        onChange={(name) => setEventInput(name)}
      />

      <SearchBar
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        resetUsers={() => setEmailInput("")}
      />

      <div id="booking-data" className="mt-4">
        {!eventInput ? (
          <p>Select an event</p>
        ) : isPending ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>An error occurred.</p>
        ) : (
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
                filteredEmails.map((email, idx) => (
                  <BookingsTableRow
                    key={`${idx}-${email}`}
                    eventName={eventInput}
                    email={email}
                    checked={!!selectedEmails[email]}
                    onChange={() =>
                      setSelectedEmails((prev) => ({
                        ...prev,
                        [email]: !prev[email],
                      }))
                    }
                  />
                ))
              ) : (
                <tr className="w-full text-xs text-center h-10">
                  <td className="w-full" colSpan={5}>
                    No Booking Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!isPending && !isError && hasNextPage && (
          <div
            onClick={() => fetchNextPage()}
            className="text-sm w-full text-center mt-3 hover:bg-gray-100 py-4 font-normal"
          >
            Load More
          </div>
        )}
      </div>

      {emailsSelected.length > 0 && (
        <div
          className="bg-[#EF4444] w-16 h-16 rounded-full fixed left-[80vw] top-[80vh] flex items-center justify-center hover:bg-gtd-red-primary-bright cursor-pointer"
          onClick={() => {
            setShowPopUp(true);
          }}
        >
          <FiTrash className="text-white w-10 h-10" />
        </div>
      )}

      {showPopUp && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black opacity-50"
          onClick={() => setShowPopUp(false)}
        ></div>
      )}

      {showPopUp && (
        <div className="fixed left-[10%] top-1/3 border-[1px] rounded-md w-4/5 h-36 bg-white flex-col flex p-4">
          <div className="font-semibold text-[2.8vw]">
            Invalidate bookings by {emailsSelected.join(", ")}?
          </div>
          <div className="text-[2.45vw] my-2 h-2/3 text-gray-500 font-light">
            This action cannot be undone. This will permanently invalidate all
            bookings made by {emailsSelected.join(", ")}.
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="border-[1px] rounded-md py-2 px-3 text-[2.45vw] mx-2 hover:bg-gray-100"
              onClick={() => setShowPopUp(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="border-[1px] rounded-md bg-red-500 text-white py-2 text-[2.45vw] px-3 hover:bg-red-600"
            >
              Invalidate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
