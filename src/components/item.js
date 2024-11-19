import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import CatalogPage from "./catalog_page";
import ItemPage from "./item_page";
import Navigation from "./navigation";
import Footer from "./footer";

function Item() {
    return (
        <Router>
            {/* Вставляємо навігацію перед Routes */}
            <Navigation />

            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                </Routes>
            </div>

            {/* Вставляємо Footer після Routes */}
            <Footer />
        </Router>
    );
}

export default Item;
