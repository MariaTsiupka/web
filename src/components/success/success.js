import React from "react";
import Button from '../Button.js';
import { Link } from "react-router-dom";


function Success() {
    return(<div>
        <img className="success-img" src="https://assets.mockflow.com/app/wireframepro/company/C8c026962c964d8a569a6668cea063d20/projects/M18d91c20232ec337dcbac40a0beba25f1599389408336/images/M3fab8e03fb1ccbf45ba210855fad2fdb1600115930660"/>
        <h2 className="txt-success">Success!</h2>
        <p className="txt-description">
        Your order was sent to processing!
        <br/>
        Check your email box for further information.
        </p>
        <Link className="link" to="/catalog">
            <Button className="go-back-btn" text="Go back to Catalog"/>
        </Link>
    </div>)
}

export default Success;