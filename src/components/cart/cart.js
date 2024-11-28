import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '../Button.js';
import { Link } from "react-router-dom";
import { incrementQuantity, decrementQuantity, removeItem } from '../../redux/perfumeSlice.js';
import axios from 'axios';

function Cart() {
    const items = useSelector(state => state.cart.items || []);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [stock, setStock] = useState({});

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get('/api/perfumes');
                console.log('Response data:', response.data);
                if (Array.isArray(response.data)) {
                    const stockData = response.data.reduce((acc, card) => {
                        card.stock.forEach(stockItem => {
                            acc[`${card.id}-${stockItem.type}`] = stockItem.amount;
                        });
                        return acc;
                    }, {});
                    setStock(stockData);
                }
            } catch (error) {
                console.error('Error fetching stock:', error);
            }
        };

        fetchStock();
    }, []);

    const handleIncrement = async (itemId, itemType) => {
        const stockKey = `${itemId}-${itemType}`;
        const stockAmount = stock[stockKey] || 0;

        if (stockAmount <= 0) {
            alert('Cannot add more items, out of stock');
            return;
        }

        try {
            const response = await axios.patch('/api/update-stock', {
                id: itemId,
                type: itemType,
                amount: -1
            });

            if (response.data.success) {
                dispatch(incrementQuantity({ id: itemId, type: itemType }));
                setStock(prevStock => ({
                    ...prevStock,
                    [stockKey]: prevStock[stockKey] - 1
                }));
            } else {
                alert('Failed to update stock');
            }
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Failed to update stock');
        }
    };

    const handleDecrement = async (itemId, itemType) => {
        const stockKey = `${itemId}-${itemType}`;

        try {
            const response = await axios.patch('/api/update-stock', {
                id: itemId,
                type: itemType,
                amount: 1
            });

            if (response.data.success) {
                const item = items.find(i => i.id === itemId && i.type === itemType);
                if (item.quantity > 1) {
                    dispatch(decrementQuantity({ id: itemId, type: itemType }));
                } else {
                    dispatch(removeItem({ id: itemId, type: itemType }));
                }
                setStock(prevStock => ({
                    ...prevStock,
                    [stockKey]: prevStock[stockKey] + 1
                }));
            } else {
                alert('Failed to update stock');
            }
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Failed to update stock');
        }
    };

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const imageSrc = (imgpath) => getImageSrc(imgpath);

    return (
        <div>
            <h1 className="title-shopping-cart">Shopping Cart</h1>
            <div>
                {items.map((item) => (
                    <div className="item-container2" key={`${item.id}-${item.type}`}>
                        <img className="item-img" src={item.imageUrl} alt={item.title} />
                        <h2 className="item-title">{item.title}</h2>
                        <div className="item-element">
                            <div className="selected-item">
                                <p>Type: {item.type}</p>
                            </div>
                            <div>
                                <Button className="btn-minus" text="-" onClick={() => handleDecrement(item.id, item.type)} />
                                <span>{item.quantity}</span>
                                <Button className="btn-plus" text="+" onClick={() => handleIncrement(item.id, item.type)} />
                                <Button className="btn-remove" text="Remove" onClick={() => dispatch(removeItem({ id: item.id, type: item.type }))} />
                            </div>
                            <p className="item-price">{item.price * item.quantity} грн</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p className="txt-cart">Total amount: {totalPrice} грн</p>
            </div>
            <div className="buttons">
                <Link className="link" to="/catalog">
                    <Button className="back-btn" text="Back to Catalog" />
                </Link>
                <Button className="add-btn" text="Continue" />
            </div>
        </div>
    );
}

export default Cart;
