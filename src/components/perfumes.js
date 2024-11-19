import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import perfumesData from "../api/perfumesData.json";

const Perfumes = ({ data = perfumesData, limit }) => {
    const location = useLocation();
    const [perfumes, setPerfumes] = useState(data || []);

    useEffect(() => {
        if (data) {
            setPerfumes(data);
        }
    }, [data]);

    // Перевірка, чи це головна сторінка
    const isHomePage = location.pathname === "/";

    // Обмеження кількості елементів, якщо передано limit
    const displayedData = limit ? perfumes.slice(0, limit) : perfumes;

    return (
        <ul className="items-container">
            {displayedData.length > 0 ? (
                displayedData.map((perfume) => (
                    <li
                        className={`perfumes-container ${isHomePage ? "home-page-container" : ""}`} // Додаємо клас для головної сторінки
                        key={perfume.id}
                    >
                        <img className="perfumes-img" src={perfume.imageUrl} alt={perfume.title} />
                        <h1 className="title-perfumes">{perfume.title}</h1>
                        <p className="description-perfumes">{perfume.description}</p>
                        <div className="price">
                            <p className="txt-price">Price: </p>
                            <p className="item-price">{perfume.price} грн</p>
                        </div>
                        <Link className="link" to={`/item-page/${perfume.id}`}>
                            <Button className="view-more-btn" text="View more" />
                        </Link>
                    </li>
                ))
            ) : (
                <p className="txt-no-found">No perfumes found</p>
            )}
        </ul>
    );
};

export default Perfumes;
