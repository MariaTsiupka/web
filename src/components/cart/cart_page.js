import React from "react";
import Navigation from "../navigation/navigation.js";
import Footer from "../footer/footer.js";
import Cart from "./cart.js";


function CartPage() {
    return (
        <div>
            <Navigation />
            <Cart />
            <Footer />
        </div>
    );
}

export default CartPage;
