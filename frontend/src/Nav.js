import React from "react";
import { Outlet, Link } from "react-router-dom";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.loggedInUser = localStorage.getItem("loggedInUser");

    }
    render () {
    if (!localStorage.getItem("loggedInUser")) {
        localStorage.setItem("loggedInUser", "No User");
    }
    return (
        <div>
          <div className="nav">
            <p className='navp'>Pxel Draw{": " + this.loggedInUser.replace(/['"]+/g, '')}</p>
            <div className="box_1">
                <Link className="link" to="/">Draw!</Link>
                <Link className="link" to="/currentuser">My Drawings</Link>
                <Link id="final" className="link" to="/account">Sign-up/Log-in</Link>
            </div>
          </div>
          <Outlet/>
        </div>
    )
    }
}

export default Nav;