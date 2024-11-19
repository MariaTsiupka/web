import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import perfumesData from "../api/perfumesData.json"; // Перевірте правильність шляху
import Button from "./Button";
import { Select } from "antd";
import Navigation from "./navigation"; // Додано Navigation
import Footer from "./footer"; // Додано Footer
import "../css/item.css";

function ItemPage() {
    const { id } = useParams(); // Отримуємо id з URL
    const navigate = useNavigate();
    const perfume = perfumesData.find(item => item.id === parseInt(id)); // Знайти парфум за id

    const [type, setType] = useState("Fresh");
    const [volume, setVolume] = useState("50 ml");

    const handleTypeChange = value => setType(value);
    const handleVolumeChange = value => setVolume(value);

    if (!perfume) {
        return <p>Perfume not found</p>; // Якщо парфум не знайдено
    }

    return (
        <div>
            {/* Вставляємо навігацію */}
            <Navigation />

            <div className="item-decriptions">
                <img className="item-img" src={perfume.imageUrl} alt={perfume.title} />
                <div>
                    <h2>{perfume.title}</h2>
                    <p className="item-description">{perfume.description}</p>
                    <div className="item-selects">
                        <div className="item-select">
                            <label className="label" htmlFor="select">Type of perfume</label>
                            <Select 
                                id="select" 
                                className="select" 
                                value={type} 
                                onChange={handleTypeChange}
                            >
                                <Select.Option value="Fresh">Fresh</Select.Option>
                                <Select.Option value="Floral">Floral</Select.Option>
                                <Select.Option value="Woody">Woody</Select.Option>
                                <Select.Option value="Citrus">Citrus</Select.Option>
                            </Select>
                        </div>
                        <div className="item-select">
                            <label className="label" htmlFor="select">Volume</label>
                            <Select 
                                className="select" 
                                value={volume} 
                                onChange={handleVolumeChange}
                            >
                                <Select.Option value="50 ml">50 ml</Select.Option>
                                <Select.Option value="100 ml">100 ml</Select.Option>
                                <Select.Option value="125 ml">125 ml</Select.Option>
                                <Select.Option value="150 ml">150 ml</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item-nav">
                <p className="item-price">{perfume.price} грн</p>
                <div>
                    <button className="back-btn" onClick={() => navigate(-1)}>Go back</button>
                    <Button className="add-btn" text="Add to cart" />
                </div>
            </div>

            {/* Вставляємо Footer */}
            <Footer />
        </div>
    );
}

export default ItemPage;
