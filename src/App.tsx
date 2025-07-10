import React, {useEffect, useRef, useState} from 'react';
import {ArrivalData, fetchData, StopData} from "./utils";
import 'bootstrap/dist/css/bootstrap.css';
import {navBar} from "./navbar";

const StopComponent = async (stopData: StopData, postcode: string): Promise<React.ReactElement> => {

  const arrivals = await stopData.getNextArrivals();

  return <>
    <div>
      <p>{stopData.getName()} - {Math.round(stopData.getDistance())} metres from {postcode}</p>
      <table>
        <tr>
          <th>Line ID</th>
          <th>Destination</th>
          <th>Expected arrival time</th>
        </tr>
      {arrivals.map(arrival => {
            return <tr><td>{arrival.getLineId()}</td> <td>{arrival.getDestinationName()}</td> <td>{arrival.getArrivalTime().toTimeString().slice(0, 8)}</td></tr>
      }
      )}
      </table>
    </div>
  </>
}

function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [numberOfStops, setNumberOfStops] = useState<string>("2");

  const [tableData, setTableData] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const interval: any = useRef(undefined);
  const [stops, setStops] = useState<Map<number, React.ReactElement>>(new Map<number, React.ReactElement>);

  // useEffect(() => {
  //   if (error !== "") {
  //     alert(error);
  //   }
  // }, [error, loading])

  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    // Get the latest buses, and set up a timer to update
    clearInterval(interval.current);
    const returnedError = await getBuses(postcode);
    console.log(postcode !== "" && error == "");
    if (postcode !== "" && returnedError == "") {
      interval.current = setInterval(() => {
        getBuses(postcode);
      }, 5000)
    }
    // getBuses(postcode);
    //const data = await getBuses(postcode);
    //setTableData(data);
  }

  async function getBuses(postcode: string): Promise<string> {
    // console.log(postcode);
    setLoading(true);
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const [stopData, returnedError] = await fetchData(postcode, +numberOfStops);
    setError(returnedError);
    const stopComponents: Map<number, React.ReactElement> = stops;
    for (var _stop of stopData) {
      stopComponents.set(_stop.getStopId(), await StopComponent(_stop, postcode));
    }
    setStops(stopComponents);
    setLoading(false);
    return returnedError;
  }

  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value);
  }

  function updateNumberOfStops(data: React.ChangeEvent<HTMLInputElement>): void {
    setNumberOfStops(data.target.value);
  }

  return <>
    {navBar()}

    <center>
      <h1>&#128652; BusBoard</h1>
      <form action="" onSubmit={formHandler}>
        <label style={{display: "block"}} htmlFor="postcodeInput"> Postcode:</label>
        <input style={{display: "block"}} type="text" id="postcodeInput" onChange={updatePostcode}/>
        {error != "" && <p style={{color: 'red'}}>{error}</p>}
        <label style={{display: "block"}} htmlFor="postcodeInput"> Max number of stops:</label>
        <input style={{display: "block"}} type="text" id="postcodeInput" value={numberOfStops} onChange={updateNumberOfStops}/>
        <input style={{margin: '5px'}} type="submit" value="Add"/>{loading &&
        <div className="spinner-border spinner-border-sm"></div>
        }
      </form>
    </center>
    <center>
      <div style={{padding: "5px"}} className={"container"}>
          {
                  <div className={"row justify-content-center"} style={{padding: "10px"}}>
                      {Array.from(stops.values()).map((stop, index) =>
                          <div className={"col-md-3 col-sm-12 card"} style={{backgroundColor: "#fc5238", minHeight: "300px", padding: "10px", margin: "10px"}}>
                              {stop}
                          </div>
                      )}
                  </div>
          }
      </div>
    </center>
  </>
}

export default App;