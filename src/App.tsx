import React, {useEffect, useState} from 'react';
import {ArrivalData, fetchData, StopData} from "./utils";
import 'bootstrap/dist/css/bootstrap.css';

const StopComponent = async (stopData: StopData): Promise<React.ReactElement> => {

  const arrivals = await stopData.getNextArrivals();

  return <>
    <div>
      <p>{stopData.getName()} - {Math.round(stopData.getDistance())} metres from [POSTCODE]</p>
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
  const [tableData, setTableData] = useState<string>("");
  const [stops, setStops] = useState<React.ReactElement[]>([]);

  function formHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    // Get the latest buses, and set up a timer to update
    getBuses(postcode);

    if (postcode !== "") {
      setInterval(() => {
        getBuses(postcode);
      }, 5000)
    }
    // getBuses(postcode);

    //const data = await getBuses(postcode);
    //setTableData(data);
  }

  async function getBuses(postcode: string): Promise<void> {
    // console.log(postcode);
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const stopData: StopData[] = await fetchData(postcode);
    const stopComponents: React.ReactElement[] = [];
    var outputString = "";
    for (var _stop of stopData) {
      stopComponents.push(await StopComponent(_stop));
    }
    setStops(stopComponents);
  }

  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value)
  }

  return <>
    <center>
      <h1> BusBoard</h1>
      <form action="" onSubmit={formHandler}>
        <label style={{display: "block"}} htmlFor="postcodeInput"> Postcode </label>
        <input style={{display: "block"}} type="text" id="postcodeInput" onChange={updatePostcode}/>
        <input type="submit" value="Submit"/>
      </form>
    </center>
    <center>
      <div style={{padding: "5px"}} className={"container"}>
        <div className={"row justify-content-center"} style={{padding: "10px"}}>
        {stops.map((stop, index) =>
              <div className={"col-md-3 col-sm-12 card"} style={{backgroundColor: "#fc5238", minHeight: "300px", padding: "10px", margin: "10px"}}>
                  {stop}
              </div>
        )}
        </div>
      </div>
    </center>
  </>
}

export default App;