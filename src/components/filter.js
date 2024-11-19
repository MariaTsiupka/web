import React, { useContext, useState } from "react";
import { Select } from 'antd';
import Button from "./Button";
import { FilterContext } from "./catalog_page"; // Імпортуємо контекст

const Filter = () => {
    const { handleSort } = useContext(FilterContext); // Використовуємо useContext
    const [filter1, setFilter1] = useState("NameAsc");
    const [filter2, setFilter2] = useState("PriceLowToHigh");

    const handleApply = () => {
        handleSort(filter1, filter2); // Викликаємо handleSort з контексту
    };

    return (
        <div className="filter">
            <div className="selects">
                <Select className="select" value={filter1} onChange={(value) => setFilter1(value)}>
                    <Select.Option value="NameAsc">Назва від А до Я</Select.Option>
                    <Select.Option value="NameDesc">Назва від Я до А</Select.Option>
                </Select>
                
                <Select className="select" value={filter2} onChange={(value) => setFilter2(value)}>
                    <Select.Option value="PriceLowToHigh">Ціна від найнижчої до найвищої</Select.Option>
                    <Select.Option value="PriceHighToLow">Ціна від найвищої до найнижчої</Select.Option>
                </Select>
            </div>
            <Button className="apply-btn" text="Apply" onClick={handleApply} />
        </div>
    );
};

export default Filter;
