import React, { useEffect, useState } from "react";
import Perfumes from "../perfumes.js";
import Button from '../Button.js';
import Loader from "../loader/loader.js";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Catalog() {
    const location = useLocation();
    const [perfumesData, setPerfumesData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(location.pathname === "/catalog" ? 8 : 4);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfumes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/perfumes');
                setPerfumesData(response.data);
            } catch (error) {
                console.error('Error fetching perfumes data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfumes();
    }, []);

    useEffect(() => {
        setVisibleCount(location.pathname === "/catalog" ? 8 : 4);
    }, [location.pathname]);

    const viewMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    const hideCards = () => {
        setVisibleCount(4);
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Відображаємо парфуми до visibleCount */}
                    <Perfumes data={perfumesData.slice(0, visibleCount)} />

                    {visibleCount < perfumesData.length && (
                        <Button text="View more" className="view-btn" onClick={viewMore} />
                    )}

                    {visibleCount >= perfumesData.length && (
                        <Button text="Hide cards" className="view-btn" onClick={hideCards} />
                    )}
                </>
            )}
        </div>
    );
}

export default Catalog;
