import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navs from '../components/Navs';

export default function MyOrder() {
    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const res = await fetch("http://localhost:4000/api/auth/myOrderData", {
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
            <div className='container'>
                <div className='row'>
                    {orderData?.orderData?.order_data?.length ? (
                        orderData.orderData.order_data.slice(0).reverse().map((item) =>
                            item.map((arrayData) => (
                                <div key={arrayData.id}>
                                    {arrayData.Order_date ? (
                                        <div className='m-auto mt-5'>
                                            {arrayData.Order_date}
                                            <hr />
                                        </div>
                                    ) : (
                                        <div className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrayData.qty}</span>
                                                        <span className='m-1'>{arrayData.size}</span>
                                                        <span className='m-1'>{arrayData.Order_date}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    ) : (
                        <p>No Orders Found</p>
                    )}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
