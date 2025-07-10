import React from "react";
import ImageSlideshow from "./ImageSlideshow";
import {navBar} from "./navbar";

function History(): React.ReactElement {
    return <>
        {navBar()}

        <div style={{margin: '10px', textAlign: 'center'}}>
            <h1>History of buses</h1>
            The <a href="https://madeby.tfl.gov.uk/2024/10/18/corporate-archives-top-stories/">modern incarnation of TfL</a> was created in July of the year 2000, but it has been built upon the infrastructure developed as early back as 1863!
            <hr></hr>
            <ImageSlideshow />
        </div>
    </>
}

export default History;