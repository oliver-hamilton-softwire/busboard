import React from "react";

const INDEX_PAGE = "http://localhost:3000/" // TODO: remove hardcoded value

export function navBar(): React.ReactElement {
    return <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"} style={{padding: "10px"}}>
        <a className={"navbar-brand"} href="#">BusBoard</a>
        <ul className={"navbar-nav"}>
            <li className={"nav-item"}>
                <a className={window.location.href == INDEX_PAGE ? "nav-link active" : "nav-link"} href="/">Board</a>
            </li>
        </ul>
        <ul className={"navbar-nav"}>
            <li className={"nav-item active"}>
                <a className={window.location.href == INDEX_PAGE + "history" ? "nav-link active" : "nav-link"} href="/history">Bus history</a>
            </li>
        </ul>
    </nav>
}