import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navs from '../components/Navs';
import Card from '../components/Card';

export default function Home() {

    const [search, setSearch] = useState('')
    const [foodCategory, setFoodCategory] = useState([])
    const [fooditem, setFooditem] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/foodData", {
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
        <div>
            <div><Navs /></div>
            
            <div>{/* Carousel Page */}
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
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

            <div className='container'>
                {
                    foodCategory.length > 0
                        ?
                        foodCategory.map((data) => {
                            return (
                                <div className='row mb-3 '>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        fooditem.length > 0
                                            ?
                                            fooditem.filter(
                                                (itemdata) => (itemdata.CategoryName === data.CategoryName) && (itemdata.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map(filteritem => {
                                                    return (
                                                        <di key={filteritem._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card
                                                                fooditem = {filteritem}
                                                                options={filteritem.options[0]}
                                                                

                                                            />
                                                        </di>
                                                    )
                                                }
                                                )
                                            : <div>No data found</div>
                                    }
                                </div>

                            )
                        })
                        : ""
                }

            </div>
            <div><Footer /></div>
        </div>
    )
}

