import React from 'react'
import NavComponent from '../components/NavComponent'
import { Link } from 'react-router-dom'
import UserInfo from '../components/UserInfo'
import CommentsComponent from '../components/CommentsComponent'
import './Product.css'

function Product() {
  return (
    <section className="product-wrapper">
        <NavComponent></NavComponent>
        <section className="page-header">
            <Link to="/feed" className="back">
                <div className="back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4a5565">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </div>
                <h3>Back</h3>
            </Link>
        </section>
        <section className="product-info">
        </section>
        <img className="product-image" src="assets/blender.webp" alt="product Image" />
        <section className="title-price">
            <div className="title">
                <h1 className="product-name">Turbo Blender</h1>
                <span className="category">Kitchen tools</span>
            </div>
            <div className="price-stars">
                <div className="price">
                    €19.99
                </div>
                <div className="stars">
                    <span>★★★★★</span>
                    <span className="rating-text">
                        4.5 (200)
                    </span>
                </div>
            
            </div>

        </section>
        <Link to="/payment" className="buy-btn">
            <button className="add-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                <path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                </svg>
                Buy it!
            </button>
        </Link>
        <p className="caption">
            The true power of Turbo Blender lies in its ability to effortlessly crush even the toughest ingredients.
        </p>
        
        <section className="details-wrapper">
            <div className="details-header">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e17100">
                    <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
                </svg>
                <h3>Details</h3>
            </div>
            <p className="details-content">
                1. Equipped with a high-performance 1200W motor for fast and efficient blending. <br></br><br></br>

                2. Features stainless steel blades designed for crushing ice and frozen fruits with ease. <br></br><br></br>

                3. Includes multiple speed settings and pulse function for precise texture control. <br></br><br></br>

                4. Comes with a durable 1.5L BPA-free glass jar suitable for smoothies, soups, and sauces. <br></br><br></br>

                5. Anti-slip base provides extra stability and safety during operation. <br></br><br></br>

                6. Easy-to-clean detachable parts are dishwasher safe for convenient maintenance.
            </p>
        </section>
        <div className="line"></div>
        <section className="likes-comments">
            <div className="comments">
                <span className="number">2</span>
                <span className="name">comments</span>
            </div>
        </section>
        <CommentsComponent></CommentsComponent>
    </section>
  )
}

export default Product
