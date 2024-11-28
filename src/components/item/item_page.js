import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import perfumesData from "../../api/perfumesData.json";  // ваш файл з парфумами
import Button from '../Button';
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/perfumeSlice";
import { useNavigate } from "react-router-dom"; // додаємо useNavigate
import "../item/item.css";

function ItemPage() {
    const { id } = useParams();
    const perfume = perfumesData.find(item => item.id === parseInt(id));

    const [selectedType, setSelectedType] = useState("Fresh");
    const [selectedVolume, setSelectedVolume] = useState("50 ml");
    const [count, setCount] = useState(1); 

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleChangeType = (value) => setSelectedType(value);
    const handleChangeVolume = (value) => setSelectedVolume(value);
    const handleChangeCount = (value) => setCount(value);

    const handleAddToCart = () => {
        if (perfume) {
            dispatch(addItem({
                ...perfume, 
                type: selectedType,
                volume: selectedVolume, 
                quantity: count
            }));
            navigate("/cart");
        }
    };

    if (!perfume) {
        return <p>Парфум не знайдено</p>;
    }

    return (
        <div>
            <div className="item-decriptions">
                <img className="item-img" src={perfume.imageUrl} alt={perfume.title} />
                <div>
                    <h2>{perfume.title}</h2>
                    <p className="item-description">{perfume.description}</p>
                    <div className="item-selects">
                        <div className="item-select">
                            <label className="label" htmlFor="select">Тип парфуму</label>
                            <Select
                                id="select"
                                className="select"
                                value={selectedType}
                                onChange={handleChangeType}
                            >
                                <Select.Option value="Fresh">Fresh</Select.Option>
                                <Select.Option value="Floral">Floral</Select.Option>
                                <Select.Option value="Woody">Woody</Select.Option>
                                <Select.Option value="Citrus">Citrus</Select.Option>
                            </Select>
                        </div>
                        <div className="item-select">
                            <label className="label" htmlFor="select">Об'єм</label>
                            <Select
                                className="select"
                                value={selectedVolume}
                                onChange={handleChangeVolume}
                            >
                                <Select.Option value="50 ml">50 ml</Select.Option>
                                <Select.Option value="100 ml">100 ml</Select.Option>
                                <Select.Option value="125 ml">125 ml</Select.Option>
                                <Select.Option value="150 ml">150 ml</Select.Option>
                            </Select>
                        </div>
                        <div className="item-select">
                            <label className="label" htmlFor="select">Кількість</label>
                            <Select
                                className="select"
                                value={count}
                                onChange={handleChangeCount}
                            >
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                                <Select.Option value={3}>3</Select.Option>
                                <Select.Option value={4}>4</Select.Option>
                                <Select.Option value={5}>5</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="item-nav">
                <p className="item-price">{perfume.price} грн</p>
                <div>
                    <Link className="link" to="/catalog">
                        <Button className="back-btn" text="Назад" />
                    </Link>
                    <Button className="add-btn" text="Додати в кошик" onClick={handleAddToCart} />
                </div>
            </div>
        </div>
    );
}

export default ItemPage;
