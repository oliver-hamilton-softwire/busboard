import React from "react";
import ImageSlideshow from "./ImageSlideshow";

function History(): React.ReactElement {
    return <>
    <h1>History of buses</h1>
    The <a href="https://madeby.tfl.gov.uk/2024/10/18/corporate-archives-top-stories/">modern incarnation of TfL</a> was created in July of the year 2000, but it has been built upon the infrastructure developed as early back as 1863!
    <ImageSlideshow />
    </>
}

export default History;