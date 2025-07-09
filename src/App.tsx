import React, {useState} from 'react';
import {ArrivalData, fetchData, StopData} from "./index";

const StopComponent = async (stopData: StopData): Promise<React.ReactElement> => {

  const arrivals = await stopData.getNextArrivals();

  return <>
    <p>{stopData.getName()}</p>
    <p>{stopData.getDistance()}</p>
    {arrivals.map(arrival => {
    return <p>{arrival.getLineId()}</p>
    }
    )}
  </>
}

function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<string>("");
  const [stops, setStops] = useState<React.ReactElement[]>([]);

  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    const data = await getBuses(postcode);
    setTableData(data);
  }

  async function getBuses(postcode: string): Promise<string> {
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const stopData: StopData[] = await fetchData(postcode);
    const stopComponents: React.ReactElement[] = [];
    var outputString = "";
    for (var _stop of stopData) {
      outputString += `Stop ${_stop.getName()} that is ${_stop.getDistance()} metres away\n`
      const buses: ArrivalData[] = await _stop.getNextArrivals();
      for (var _bus of buses) {
        outputString += `Line ${_bus.getLineId()} to ${_bus.getDestinationName()} expected at ${_bus.getArrivalTime().toTimeString().slice(0,8)}\n`
      }
      stopComponents.push(await StopComponent(_stop));
    }
    setStops(stopComponents);
    return outputString;
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