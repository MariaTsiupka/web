import React, { useContext, useState } from "react";
import { Select } from 'antd';
import Button from '../Button.js';
import { FilterContext } from "../catalog/catalog_page.js";

function Filter() {
    const { handleSort } = useContext(FilterContext);
    const [filter1, setFilter1] = useState("None");
    const [filter2, setFilter2] = useState("None");

    const handleFilter1Change = (value) => {
        setFilter1(value);
        setFilter2("None");
    };

    const handleFilter2Change = (value) => {
        setFilter2(value);
        setFilter1("None");
    };

    const handleApply = () => {
        handleSort(filter1, filter2);
    };

    return (
        <div className="filter">
            <div className="selects">
                <Select className="select" value={filter1} onChange={handleFilter1Change}>
                    <Select.Option value="None">None</Select.Option>
                    <Select.Option value="NameAsc">Назва від А до Я</Select.Option>
                    <Select.Option value="NameDesc">Назва від Я до А</Select.Option>
                </Select>
                
                <Select className="select" value={filter2} onChange={handleFilter2Change}>
                    <Select.Option value="None">None</Select.Option>
                    <Select.Option value="PriceLowToHigh">Ціна від найнижчої до найвищої</Select.Option>
                    <Select.Option value="PriceHighToLow">Ціна від найвищої до найнижчої</Select.Option>
                </Select>
            </div>
            <Button className="apply-btn" text="Apply" onClick={handleApply} />
        </div>
    );
};

export default Filter;
