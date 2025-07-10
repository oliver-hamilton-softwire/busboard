const APP_KEY: string = 'e92dcffed66741b09040d3ff8bdc58c7';
const NUMBER_OF_STOPS: number = 2;
const BUSES_PER_STOP: number = 5;

export class StopData {
    private name: string;
    private distance: number;
    private stopId: number;

    public constructor(name: string, distance: number, stopId: number) {
        this.name = name;
        this.distance = distance;
        this.stopId = stopId;
    }

    public async getNextArrivals(): Promise<ArrivalData[]> {
        const nextBuses = await getUpcomingBuses(this.stopId);
        const arrvials = [];

        for (var i = 0; i < BUSES_PER_STOP && i < nextBuses.length; i++) {
            let nextBus = nextBuses[i];

            arrvials.push(new ArrivalData(nextBus.lineId, nextBus.destinationName, nextBus.expectedArrival));
        }

        return arrvials;
    }

    public getName(): string {
        return this.name;
    }

    public getDistance(): number {
        return this.distance;
    }

    public getStopId(): number {
        return this.stopId;
    }
}

export class ArrivalData {
    private lineId: number;
    private destinationName: string;
    private arrivalTime: Date;
    public constructor(lineId: number, destinationName: string, arrivalTime: Date) {
        this.lineId = lineId;
        this.destinationName = destinationName;
        this.arrivalTime = new Date(arrivalTime);
    }

    public getLineId(): number {
        return this.lineId;
    }

    public getDestinationName(): string {
        return this.destinationName;
    }

    public getArrivalTime(): Date {
        return this.arrivalTime;
    }
}

const getPostcodeData = async (postcode: string) => {
    const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
    return await postcodeResponse.json();
}

const getNearestStops = async (lat: number, long: number) => {
    const stopsResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram&app_key=${APP_KEY}`);
    const stopsJson = await stopsResponse.json();
    return stopsJson.stopPoints.slice(0, NUMBER_OF_STOPS);
}

const getUpcomingBuses = async (stopId: number) => {
    const nextBusesResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?app_key=${APP_KEY}`);
    const nextBusesJson = await nextBusesResponse.json();
    nextBusesJson.sort((a: any, b: any) => new Date(a.expectedArrival).getTime() - new Date(b.expectedArrival).getTime());
    return nextBusesJson;
}

export const fetchData = async (postcode: string): Promise<[StopData[], string]> => {
    //const postcode: string = readlineSync.question('Enter postcode: ');
    let postcodeJson;
    postcodeJson = await getPostcodeData(postcode);
    if ('error' in postcodeJson) {
        return [[], postcodeJson.error];
    }
    const stops = await getNearestStops(postcodeJson.result.latitude, postcodeJson.result.longitude);

    var stopJSON: StopData[] = [];

    for (const stop of stops) {
        var stopData: StopData = new StopData(stop.commonName, stop.distance, stop.naptanId);

        //console.log(`Buses at ${stop.commonName} (${Math.round(stop.distance)} metres away):`);
        // const nextBuses = await getUpcomingBuses(stop.naptanId);

        // for (const busJson of nextBuses.slice(0, BUSES_PER_STOP)) {
        //     const busDate: Date = new Date(busJson.expectedArrival);
        //
        //     var busData = {
        //         lineId: busJson.lineId,
        //         destinationName: busJson.destinationName,
        //         arrivalTime: busDate
        //     }
        //
        //     stopData.buses.push(busData);
        //     //console.log(`Line ${busJson.lineId} to ${busJson.destinationName} expected at ${busDate.toTimeString().slice(0,8)}`);
        // }
        stopJSON.push(stopData);

        // return stopData;
        //console.log();
    }
    return [stopJSON, ""];
}

//fetchData();