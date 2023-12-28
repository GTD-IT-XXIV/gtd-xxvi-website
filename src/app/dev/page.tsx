"use client";

import { sendEmail } from "./send-email";

export default function Dev() {
  return (
    <main>
      <h1>Development Page</h1>
      <hr />
      <button
        type="button"
        onClick={() => sendEmail()}
        className="bg-white hover:bg-slate-200 p-2"
      >
        Send Email
      </button>
    </main>
  );
}
