import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.js";
import Filter from '../filter/filter.js';
import Footer from "../footer/footer.js";
import Perfumes from "../perfumes.js";
import Loader from "../loader/loader.js";
import axios from "axios";

// Створюємо контекст
export const FilterContext = createContext();

function CatalogPage() {
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortName, setSortName] = useState("None");
    const [sortPrice, setSortPrice] = useState("None");
    const [visibleCount, setVisibleCount] = useState(location.pathname === "/catalog" ? 8 : 4);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfumes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/perfumes', {
                    params: {
                        search: searchTerm,
                        sortName,
                        sortPrice
                    }
                });
                setFilteredData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching perfumes data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfumes();
    }, [searchTerm, sortName, sortPrice]);

    useEffect(() => {
        setVisibleCount(location.pathname === "/catalog" ? 8 : 4);
    }, [location.pathname]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSort = (criteria1, criteria2) => {
        setSortName(criteria1);
        setSortPrice(criteria2);
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
                {loading ? <Loader /> : <Perfumes data={filteredData.slice(0, visibleCount)} />}
                <Footer />
            </div>
        </FilterContext.Provider>
    );
}

export default CatalogPage;