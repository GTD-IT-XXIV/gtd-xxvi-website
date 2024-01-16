/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/51 GitHub Issue}
 */

interface Bundle{
  name: String,
  date: String,
  startTime: String,
  endTime: String,
  price: Number,
  type: String,
}

const bundles = [
  {
    name: "Escape Room Bundle",
    date: "Monday, 18 March 2024",
    startTime: "9.00",
    endTime: "10.00 AM",
    price: 50,
    type: "bundle",
  },
  {
    name: "GTD Fest Individual",
    date: "Monday, 18 March 2024",
    startTime: "",
    endTime: "",
    price: 12,
    type: "individual",
  }

]
export default function DetailsPage() {
  const getDescription = (date: String, startTime: String, endTime: String) => {
    if (startTime) return date + ', ' + startTime + ' - ' + endTime
    return date
  }

  const getBundle = (bundle: Bundle) => {
    return(
      <div className="flex">
        <div className="bundle-details my-2 w-5/6">
          <div className="bundle-name text-[3vw] my-1 font-medium">{bundle.name}</div>
          <div className="bundle-description text-[3vw] my-1 text-gtd-primary-30 font-light">{getDescription(bundle.date, bundle.startTime, bundle.endTime)}</div>
        </div>
        <div className="flex items-center justify-end my-2 text-[3vw] w-1/6">${bundle.price.toString()}</div>
      </div>
    )
  }

  const getBundleType = () => {
    return bundles.filter(bundle => bundle.type === "bundle")
  }
  

  return(
    // Mobile UI ( width <= ~400 px )
    <section className="p-4">
      <h1 className="text-[7.5vw] font-medium my-4 text-gtd-primary-30">Booking Details</h1>
      <h2 className="text-[5vw] font-medium my-3">Booking Review</h2>

      <div id="bundle-details-container">
        {bundles.map(bundle => getBundle(bundle))}
      </div>
      
      <div>
        <h2 className="text-[5vw] font-medium mt-3 mb-2">Enter Booking Info</h2>
        <input placeholder="Full Name" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
        <input placeholder="Email Adress" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
        <input placeholder="Telegram" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
        <input placeholder="Phone Number" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
      </div>

      {
         getBundleType().length > 0 &&
         (
           <h2 className="text-[5vw] font-medium mt-3 mb-2">Enter Participant Details</h2>
         )
      }
      {
        getBundleType().length > 0 &&
        (
          getBundleType().map(bundle => {
          return(
            <div>
              <div>{bundle.name.split('Bundle')}</div>
              <input placeholder="Participant 1" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
              <input placeholder="Participant 2" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
              <input placeholder="Participant 3" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
              <input placeholder="Participant 4" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
              <input placeholder="Participant 5" className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"></input><br></br>
            </div>
          )
          })
        )
      }
    </section>
  )
}
