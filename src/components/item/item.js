import React from "react";
import ItemPage from "./item/item_page.js";
import Navigation from "./navigation/navigation.js";
import Footer from "./footer/footer.js";



function Item() {
    return(<div>
        <Navigation />
        <ItemPage/>
        <Footer />
    </div>)
}

export default Item;