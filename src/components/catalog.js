import React, { useState } from "react";
import Perfumes from "./perfumes";
import Button from "./Button";
import perfumesData from "../api/perfumesData.json";

const Catalog = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    const viewMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    const hideCards = () => {
        setVisibleCount(4);
    };

    return (
        <div>
            {/* Відображаємо парфуми до count */}
            <Perfumes data={perfumesData.slice(0, visibleCount)} /> 

            {visibleCount < perfumesData.length && (
                <Button text="View more" className="view-btn" onClick={viewMore} />
            )}

            {visibleCount >= perfumesData.length && (
                <Button text="Hide cards" className="view-btn" onClick={hideCards} />
            )}
        </div>
    );
};

export default Catalog;
