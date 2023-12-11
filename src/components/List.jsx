import React, { useState, useEffect } from 'react'; // useState - a hook
import { v4 as uuidv4 } from 'uuid';

// Defining the states of groceries array and input value
const List = () => {
    const [groceries, setGroceries] = useState(() => {
        const storedList = JSON.parse(localStorage.getItem("groceries")) || [];
        return storedList;
    });
    const [inputValue, setInputValue] = useState("");
    const [inputQuantity, setInputQuantity] = useState("");

    // Loading data from local storage
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("groceries")) || [];
        setGroceries(storedList);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Updating local storage
    useEffect(() => {
        localStorage.setItem("groceries", JSON.stringify(groceries));
    }, [groceries]); // Indicates that this effect should re-run whenever the groceries state changes

    // Grabs new item input value
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // event = onChange, target = new input, value = input text
    };

        // Grabs new quantity input value
    const handleQuantityInputChange = (event) => {
        setInputQuantity(event.target.value); // event = onChange, target = new input, value = input quantity
    };

    // Handles checkbox states
    const handleCheckboxChange = (itemId) => {
        const updatedGroceries = groceries.map(item => item.id === itemId ? { ...item, isChecked: !item.isChecked } : item);
        setGroceries(updatedGroceries);
    };

    // Adds input value to groceries list IF the value isn't an empty string
    const addItem = () => {
        if (inputValue.trim() !== "") { 
            setGroceries([...groceries, {id: uuidv4(), item: inputValue, quantity: inputQuantity, isChecked: false}]); // Adds new input to the grocery array
        setInputValue("");
        setInputQuantity("");
        }
    };

    // Removes item from the groceries list
    const removeItem = (itemId) => {
        const trimmedGroceries = groceries.filter(item => item.id !== itemId);
        setGroceries(trimmedGroceries);
    }

    // Makes "Enter" key equal to "Submit" button
    const handleKeyPress = () => {
        if (event.key === "Enter") {
            addItem();
        }
    };

    return (
        <div id="list" style={{borderStyle: "solid", borderRadius: "4%", padding: "50px", borderColor: "rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(26, 26, 26, 0.5)", boxShadow: "0px 0px 25px 1px rgba(5, 4, 8, 0.8)"}}>
            <h1>Grocery List</h1>
            <input id="inputItem"
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter new item..." 
                style={{width: "200px", height: "30px", fontSize: "18px", padding: "5px", marginRight: "20px", backgroundColor: "rgba(255, 255, 255, 0.7)", color: "black"}}/>
            <input id="inputQuantity"
                type="text" 
                value={inputQuantity}
                onChange={handleQuantityInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Quantity" 
                style={{width: "80px", height: "30px", fontSize: "18px", padding: "5px", marginRight: "20px", backgroundColor: "rgba(255, 255, 255, 0.7)", color: "black"}} />
            <button id="addItem" onClick={addItem} style={{boxShadow: "0px 3px 5px 1px rgba(5, 4, 8, 0.8)", backgroundColor: "#e85d04", textShadow: "1px 1px 3px rgba(0, 0, 0, 1)"}}>
                Add Item
            </button>
            <ul style={{listStyle: "none", fontSize: "20px", display: "flex", flexDirection: "column", padding: "0"}}>{groceries.map((item)=> (
                <label key={item.id} style={{padding: "15px 0px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid rgba(255, 255, 255, 0.5)"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="checkbox" checked={item.isChecked} onChange={() => handleCheckboxChange(item.id)} style={{height: "20px", width: "20px", marginRight: "15px"}}/>
                        <div style={{opacity: item.isChecked ? "0.5" : "1", textDecoration: item.isChecked ? "line-through" : "none"}}>{item.quantity} {item.item}</div>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{borderRadius: "50%", borderColor: "rgba(255, 255, 255, 0.7", height: "30px", width: "30px", padding: "0px", marginLeft: "50px", color: "#e85d04"}}>x</button>
                </label>
            ))}</ul>
        </div>
    );
};

export default List;