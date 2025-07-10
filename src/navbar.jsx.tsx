import React from "react";

export function navBar(): React.ReactElement {
    return <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"} style={{padding: "10px"}}>
        <a className={"navbar-brand"} href="#">BusBoard</a>
        <ul className={"navbar-nav"}>
            <li className={"nav-item"}>
                <a className={"nav-link"} href="/">Board</a>
            </li>
        </ul>
        <ul className={"navbar-nav"}>
            <li className={"nav-item active"}>
                <a className={"nav-link"} href="/history">Bus history</a>
            </li>
        </ul>
    </nav>
}