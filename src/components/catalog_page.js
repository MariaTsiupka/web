import React, { useState, createContext } from "react";
import Navigation from "./navigation";
import Filter from "./filter";
import Footer from "./footer";
import Perfumes from "./perfumes";
import perfumes from "../api/perfumesData.json";

// Створюємо контекст
export const FilterContext = createContext();

function CatalogPage() {
    const [filteredData, setFilteredData] = useState(perfumes.slice(0, 4));
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = perfumes.filter(perfume =>
            perfume.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSort = (criteria1, criteria2) => {
        let sortedPerfumes = [...filteredData];
        
        if (criteria1 === "NameAsc") {
            sortedPerfumes.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria1 === "NameDesc") {
            sortedPerfumes.sort((a, b) => b.title.localeCompare(a.title));
        }

        if (criteria2 === "PriceLowToHigh") {
            sortedPerfumes.sort((a, b) => a.price - b.price);
        } else if (criteria2 === "PriceHighToLow") {
            sortedPerfumes.sort((a, b) => b.price - a.price);
        }

        setFilteredData(sortedPerfumes);
    };

    const contextValue = {
        searchTerm,
        handleSearch,
        handleSort
    };

    return (
        <FilterContext.Provider value={contextValue}>
            <div className="catalog-page">
                <Navigation onSearch={handleSearch} />
                <Filter />
                <Perfumes data={filteredData.slice(0, 4)} />
                <Footer />
            </div>
        </FilterContext.Provider>
    );
}

export default CatalogPage;
