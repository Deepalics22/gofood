import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState(''); 

  const loadFoodData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
      console.log("Food Items:", data[0]);
      console.log("Food Categories:", data[1]);
    } catch (error) {
      console.error("❌ Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadFoodData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Section with Search Bar */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pastry" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Barbeque" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Items Section */}
      <div className="container my-3">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-4">
              <h2 className="fs-3 m-3">{category.CategoryName}</h2>
              <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
              <div className="row">
                {foodItems
                  .filter(
                    item =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(filteredItem => (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                      <Card
                        foodName={filteredItem.name}
                        item={filteredItem}
                        options={filteredItem.options[0]}
                        ImgSrc={filteredItem.img}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center">Loading Food Items...</h4>
        )}
      </div>

      <Footer />
    </div>
  );
}
