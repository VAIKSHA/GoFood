
import React, { useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const cart = useCart();

    const options = props.options;
    const priceOptions = Object.keys(options);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(priceOptions[0]);

    const finalPrice = quantity * parseInt(options[size]);

    const itemInCart = cart.find(item => item.id === props.fooditem._id && item.size === size);
    const isMaxLimitReached = itemInCart && itemInCart.quantity >= 6;


    const handleAddToCart = async () => {
        // Check if the item with the same id and size exists in the cart
        let food = cart.find(item => item.id === props.fooditem._id && item.size === size);

        if (food) {
            // Check if adding the quantity exceeds the limit
            if (food.quantity + quantity > 6) {
                alert("You cannot add more than 6 of this item.");
                return; // Prevent further execution
            }

            // Update the existing item's quantity and price
            await dispatch({
                type: "UPDATE",
                id: props.fooditem._id,
                size: size,
                quantity: quantity, // Add the new quantity to the existing one
                price: finalPrice,  // Add the new price to the existing one
            });
        } else {
            // Ensure the initial quantity does not exceed 6
            if (quantity > 6) {
                alert("You cannot add more than 6 of this item.");
                return; // Prevent further execution
            }

            // Add the new item to the cart
            await dispatch({
                type: "ADD",
                id: props.fooditem._id,
                name: props.fooditem.name,
                price: finalPrice,
                quantity: quantity,
                size: size,
                img: props.fooditem.img,
            });
        }

        console.log("Updated Cart:", cart);
    };


    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="card mt-3 rounded-4 shadow-lg" style={{ 
                    width: "18rem", 
                    maxHeight: "360px",
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }} onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                }} onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}>
                    <img
                        src={props.fooditem.img}
                        className="card-img-top rounded-4 shadow-lg"
                        alt={props.fooditem.name}
                        style={{ 
                            height: "150px", 
                            objectFit: "fill",
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditem.name}</h5>
                        <div className='container w-100'>
                            <select
                                className='m-2 h-100 bg-success rounded'
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            >
                                {Array.from(Array(6), (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>

                            <select
                                className='m-2 h-100 bg-success rounded'
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {priceOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button
                            className='btn btn-success ms-2 d-flex align-items-center justify-content-center'
                            onClick={handleAddToCart}
                            disabled={isMaxLimitReached}
                            style={{
                                transition: 'all 0.3s ease',
                                borderRadius: '20px'
                            }}
                            onMouseEnter={(e) => {
                                if (!isMaxLimitReached) {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {isMaxLimitReached ? "Limit Reached" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
