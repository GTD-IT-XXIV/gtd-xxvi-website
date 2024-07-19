export default function GTDFestTitleLoading() {
  const startDateLabel = "18 Feb";
  const endDateLabel = "3 Mar 2024";

  return (
    <hgroup className="space-y-3">
      <h1 className="text-lg md:text-2xl font-serif">
        <div>GTD Fest</div>
        <div className="text-4xl md:text-6xl lg:text-7xl text-amber-100 text-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-amber-100 italic tracking-wider">
          Enchantium
        </div>
        <p className="text-lg md:text-xl opacity-65">X</p>
        <div>Escape Room</div>
        <div className="text-4xl md:text-6xl lg:text-7xl text-red-200 text-shadow-[0px_0px_4px_var(--tw-shadow-color)] shadow-red-200 italic tracking-wider">
          Nyctophobia
        </div>
        {/* <div className="text-4xl md:text-5xl lg:text-6xl italic tracking-wider text-amber-100">
          Pre-order
          <br />
          Enchantium
          <br />
          Merchandise
        </div> */}
      </h1>
      <p className="font-light md:text-2xl">
        {startDateLabel} - {endDateLabel}
      </p>
    </hgroup>
  );
}
