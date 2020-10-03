import React, { useState, useEffect } from 'react';
import CartItem from './CartItem'
import './Cart.css'

function Cart({ initialItems }) {

    const initialState = JSON.parse(window.localStorage.getItem('items'));
    const [items, setItems] = useState(initialState || initialItems);

    useEffect(() => {
        window.localStorage.setItem('items', JSON.stringify(items));
    }, [items])

    const updateQty = (id, qty) => {
        const newItems = items.map(item => {
            if (item.id === id)
                return { ...item, qty };

            return item;
        })
        setItems(newItems)
    }

    const grandTotal = items.reduce((acc, item) => (
        acc + item.qty * item.price
    ), 0).toFixed(2);

    return (
        <div className="Cart">
            <h1 className="Cart-title">This is your cart!</h1>
            <div className="Cart-items">
                {items.map(item => (
                    <CartItem key={item.id} {...item} updateQty={updateQty} />
                ))}
            </div>
            <h3 className="Cart-total">Grand Total: ${grandTotal}</h3>
        </div>
    )
}

export default Cart;

