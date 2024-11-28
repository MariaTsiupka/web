import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import perfumesData from "../../api/perfumesData.json";  // ваш файл з парфумами
import Button from '../Button.js';
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/perfumeSlice.js";
import axios from 'axios';
import "../item/item.css";
import Navigation from "../navigation/navigation.js";
import Footer from "../footer/footer.js";


function ItemPage() {
    const { id } = useParams();
    const perfume = perfumesData.find(item => item.id === parseInt(id));

    const [type, setType] = useState("Fresh");
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [card, setCard] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/perfumes/${id}`)
            .then(response => {
                const cardData = response.data;
                setCard(cardData);
            })
            .catch(error => {
                console.error('Error fetching card:', error);
                setError('Failed to load card');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleTypeChange = (value) => setType(value);
    const handleCountChange = (e) => {
        const value = Math.min(e.target.value, perfume.stock.find(stockItem => stockItem.type === type).amount);
        setCount(value);
    };

    const handleAddToCart = async () => {
        if (perfume) {
            console.log("Adding item to cart:", perfume.id, type, count);
            dispatch(setCart({
                id: perfume.id,
                type,
                price: perfume.price,
                quantity: count || 1,
                imageUrl: perfume.imageUrl,
                title: perfume.title,
            }));

            // Update stock in JSON file
            await axios.patch('/api/update-stock', {
                id: perfume.id,
                type,
                amount: -count
            });
        } else {
            console.log("Perfume not found!");
        }
    };

    const availableAmount = perfume ? perfume.stock.find(stockItem => stockItem.type === type).amount : 0;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!card) {
        return <p>Perfume not found</p>;
    }

    return (
        <div>
            <Navigation /> {/* Додаємо навігацію */}
            
            <div className="item-decriptions1">
                <img className="item-img1" src={perfume.imageUrl} alt={perfume.title} />
                <div>
                    <h2>{perfume.title}</h2>
                    <p className="item-description1">{perfume.description}</p>
                    <p>Available amount: {availableAmount}</p>
                    <div className="item-selects1">
                        <div className="item-select1">
                            <label className="label1" htmlFor="select">Type of perfume</label>
                            <Select
                                id="select"
                                className="select1"
                                value={type}
                                onChange={handleTypeChange}
                            >
                                {perfume && perfume.stock.map((stockItem) => (
                                    <Select.Option key={stockItem.type} value={stockItem.type}>
                                        {stockItem.type}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="item-select1">
                            <label className="label1" htmlFor="count">Amount</label>
                            <input
                                type="number"
                                id="count"
                                className="select"
                                value={count}
                                onChange={handleCountChange}
                                min="1"
                                max={availableAmount}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="item-nav1">
                <p className="item-price1">{perfume.price} грн</p>
                <div>
                    <Link className="link1" to="/catalog">
                        <Button className="back-btn1" text="Go back" />
                    </Link>
                    <Link className="link1">
                        <Button className="add-btn1" text="Add to cart" onClick={handleAddToCart} />
                    </Link>
                </div>
            </div>

            <Footer /> {/* Додаємо футер */}
        </div>
    );
}


export default ItemPage;
