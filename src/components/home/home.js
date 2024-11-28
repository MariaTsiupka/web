import React from "react";
import Navigation from "../navigation/navigation.js";
import Catalog from "../catalog/catalog.js";
import Footer from "../footer/footer.js";
import HomePage from "./home_page.js";

function Home() {
    return(<div>
        <Navigation />
        <HomePage />
        <Catalog />
        <Footer />
    </div>)
}

export default Home;