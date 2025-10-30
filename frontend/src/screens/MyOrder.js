import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navs from '../components/Navs';
import { useDispatchCart, useCart } from '../components/ContextReducer';

export default function MyOrder() {
    const [orderData, setorderData] = useState({});
    const dispatch = useDispatchCart();
    const cart = useCart();

    const handleReorder = async (item) => {
        const quantity = item.quantity || item.qty || 1;
        const finalPrice = quantity * (item.price / quantity);
        
        let food = cart.find(cartItem => cartItem.id === item.id && cartItem.size === item.size);
        
        if (food) {
            if (food.quantity + quantity > 6) {
                alert("You cannot add more than 6 of this item.");
                return;
            }
            await dispatch({
                type: "UPDATE",
                id: item.id,
                size: item.size,
                quantity: quantity,
                price: finalPrice,
            });
        } else {
            if (quantity > 6) {
                alert("You cannot add more than 6 of this item.");
                return;
            }
            await dispatch({
                type: "ADD",
                id: item.id,
                name: item.name,
                price: finalPrice,
                quantity: quantity,
                size: item.size,
                img: item.img,
            });
        }
        alert("Item added to cart!");
    };

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const res = await fetch("http://localhost:4000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const text = await res.text();
            console.log('Raw Response:', text);
            
            // Parse JSON if response is valid
            const response = JSON.parse(text);
            console.log('Parsed JSON:', response);
            setorderData(response);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div>
                <Navs />
            </div>
            <div className='container-fluid' style={{background: 'linear-gradient(135deg, #adafb1ff 0%, #8394aeff 100%)', minHeight: '100vh', paddingTop: '2rem'}}>
                <div className='container'>
                    <h2 className='text-center text-white mb-5' style={{fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>My Orders</h2>
                    <div className='row justify-content-center'>
                        {orderData?.orderData?.order_data?.length ? (
                            orderData.orderData.order_data.slice(0).reverse().map((item, index) =>
                                item.map((arrayData, idx) => (
                                    arrayData.Order_date ? (
                                        <div key={`${index}-${idx}`} className='col-12 mb-4'>
                                            <div className='text-center p-3' style={{background: 'rgba(255,255,255,0.9)', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)'}}>
                                                <h4 style={{color: '#333', fontWeight: 'bold', margin: 0}}>
                                                    📅 {arrayData.Order_date}
                                                </h4>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={`${index}-${idx}`} className='col-12 col-md-6 col-lg-3 mb-4'>
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
                                                        src={arrayData.img}
                                                        className="card-img-top rounded-4 shadow-lg"
                                                        alt={arrayData.name}
                                                        style={{ 
                                                            height: "150px", 
                                                            objectFit: "fill",
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100'>
                                                            <div className='d-flex gap-2 mb-2'>
                                                                <span className='badge bg-success'>Qty: {arrayData.quantity || arrayData.qty}</span>
                                                                <span className='badge bg-primary'>Size: {arrayData.size}</span>
                                                            </div>
                                                            <div className='d-inline h-100 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <button
                                                            className='btn btn-success ms-2 d-flex align-items-center justify-content-center'
                                                            onClick={() => handleReorder(arrayData)}
                                                            style={{
                                                                transition: 'all 0.3s ease',
                                                                borderRadius: '20px'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.transform = 'scale(1.05)';
                                                                e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.4)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.transform = 'scale(1)';
                                                                e.target.style.boxShadow = 'none';
                                                            }}
                                                        >
                                                            Reorder
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                ))
                            )
                        ) : (
                            <div className='col-12 text-center'>
                                <div style={{background: 'rgba(255,255,255,0.9)', padding: '60px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}}>
                                    <div style={{fontSize: '80px', marginBottom: '20px'}}>🍽️</div>
                                    <h3 style={{color: '#666', fontWeight: 'bold'}}>No Orders Found</h3>
                                    <p style={{color: '#999', fontSize: '18px'}}>You haven't placed any orders yet. Start exploring our delicious menu!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
