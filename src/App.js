import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home.js";
import CatalogPage from "./components/catalog/catalog_page.js";
import ItemPage from "./components/item/item_page.js";
import CartPage from './components/cart/cart_page.js';
import CheckoutPage from "./components/check/checkout_page.js";
import SuccessPage from "./components/success/success_page.js";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/item-page/:id" element={<ItemPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={< CheckoutPage/>}/>
                <Route path="/success" element={<SuccessPage />} />
            </Routes>
        </Router>
    );
}

export default App;