import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navs from '../components/Navs';
import Card from '../components/Card';

// Add CSS animations
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default function Home() {

    const [search, setSearch] = useState('')
    const [foodCategory, setFoodCategory] = useState([])
    const [fooditem, setFooditem] = useState([])

    const loadData = async () => {
        let response = await fetch("https://gofood-grr4.onrender.com/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json()

        setFooditem(response[0])
        setFoodCategory(response[1])
        // console.log(response[0],response[1])
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div style={{background: 'linear-gradient(135deg, #adafb1ff 0%, #8394aeff 100%)', minHeight: '100vh'}}>
            <div><Navs /></div>
            
            <div>{/* Carousel Page */}
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important", borderRadius: '0 0 30px 30px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center mb-4">
                                <h1 style={{color: 'white', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontSize: '3.5rem', marginBottom: '30px', fontStyle: 'italic'}}>Welcome to GoFood</h1>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div style={{position: 'relative', width: '100%', maxWidth: '500px'}}>
                                    <input className="form-control" type="search" placeholder="🔍 Search your favorite food..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{
                                        padding: '15px 20px',
                                        borderRadius: '50px',
                                        border: 'none',
                                        fontSize: '18px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(10px)'
                                    }}/>
                                </div>
                            </div>
                        </div>

                        {/* 1st image */}
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(33%)" }} alt="..." />
                        </div>

                        {/* 2nd image */}
                        <div className="carousel-item">
                            <img src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(33%)" }} alt="..." />
                        </div>

                        {/* 3rd image */}
                        <div className="carousel-item">
                            <img src="https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=3038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(33%)" }} alt="..." />
                        </div>
                    </div>

                    {/* Previous button */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    {/* next button */}
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container py-5'>
                {
                    foodCategory.length > 0
                        ?
                        foodCategory.map((data, index) => {
                            return (
                                <div key={data._id} className='mb-5' style={{animation: `fadeInUp 0.6s ease ${index * 0.1}s both`}}>
                                    <div className='text-center mb-4'>
                                        <h2 style={{
                                            background: 'white',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 'bold',
                                            fontSize: '2.5rem',
                                            // textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                            position: 'relative',
                                            display: 'inline-block',
                                            padding: '10px 30px'
                                        }}>
                                            {data.CategoryName}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '80px',
                                                height: '4px',
                                                background: 'white',
                                                borderRadius: '2px'
                                            }}></div>
                                        </h2>
                                    </div>
                                    <div className='row g-4'>
                                        {
                                            fooditem.length > 0
                                                ?
                                                fooditem.filter(
                                                    (itemdata) => (itemdata.CategoryName === data.CategoryName) && (itemdata.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                    .map((filteritem, itemIndex) => {
                                                        return (
                                                            <div key={filteritem._id} className='col-12 col-md-6 col-lg-3' style={{animation: `slideInUp 0.6s ease ${itemIndex * 0.1}s both`}}>
                                                                <Card
                                                                    fooditem = {filteritem}
                                                                    options={filteritem.options[0]}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    )
                                                : <div className='col-12 text-center' style={{padding: '40px', background: 'rgba(255,255,255,0.8)', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                                                    <div style={{fontSize: '60px', marginBottom: '20px'}}>🍽️</div>
                                                    <h4 style={{color: '#666'}}>No data found</h4>
                                                  </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        : <div className='text-center py-5'>
                            <div style={{background: 'rgba(255,255,255,0.9)', padding: '60px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}}>
                                <div style={{fontSize: '80px', marginBottom: '20px'}}>🍕</div>
                                <h3 style={{color: '#666', fontWeight: 'bold'}}>Loading Menu...</h3>
                            </div>
                          </div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}

