import { useState } from "react";

const ImageSlideshow = () => {
    const [counter, setCounter] = useState(0);

    const images = [
        {
            title: 'Oyster card introduced',
            year: 2003,
            imageurl: 'https://wise.com/imaginary/oyster-card-in-uk_124338035.jpg',
            caption: 'The introduction of the Oyster smart card streamlined travel in London.'
        },
        {
            title: 'Wheelchair-accessible buses',
            year: 2005,
            imageurl: 'https://wheelsforwellbeing.org.uk/wp-content/uploads/2022/01/7677594164_5d1636b048_c.jpg',
            caption: 'All London buses were made wheelchair-accessible.'
        }
        
    ];

    const incrementCounter = () => {
        setCounter(prevCounter => Math.min(prevCounter + 1, images.length - 1));
    }

    const decrementCounter = () => {
        setCounter(prevCounter => Math.max(prevCounter - 1, 0));
    }


    return <div style={{textAlign: 'center', margin: '10px'}}>
        <h2>{images[counter].title}</h2>
        <p>{images[counter].year}</p>
        <img src={images[counter].imageurl} width="600px"></img>
        <p>{images[counter].caption}</p>
        <div style={{textAlign: 'center'}}>
            <button style={{marginRight: '50px'}} onClick={decrementCounter} disabled={counter == 0}>Previous</button>
            <button onClick={incrementCounter} disabled={counter == images.length - 1}>Next</button>
        </div>
    </div>
}

export default ImageSlideshow;