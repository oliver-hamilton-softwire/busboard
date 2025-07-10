import React, {useEffect, useState} from 'react';
import {ArrivalData, fetchData, StopData} from "./utils";

const StopComponent = async (stopData: StopData): Promise<React.ReactElement> => {

  const arrivals = await stopData.getNextArrivals();

  return <>
    <p>{stopData.getName()}</p>
    <p>{stopData.getDistance()}</p>
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
  </>
}

function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<string>("");
  const [stops, setStops] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    if (postcode !== "") {
      setTimeout(() => {
        getBuses(postcode);
      }, 5000)
    }
  })

  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    await getBuses(postcode);
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
    <h1> BusBoard </h1>
    <form action="" onSubmit={formHandler}>
      <label htmlFor="postcodeInput"> Postcode: </label>
      <input type="text" id="postcodeInput" onChange={updatePostcode}/>
      <input type="submit" value="Submit"/>
    </form>
    {stops.map(stop =>
      stop
    )}
    {JSON.stringify(tableData, null, 4) /* this will just render the string - try creating a table 'dynamically'! */}
  </>
}

export default App;