import React from 'react'
import NavComponent from '../components/NavComponent'
import { Link } from 'react-router-dom'
import './Payment.css'
import PaymentForm from '../components/PaymentForm'

function Payment() {
    return (
        <section className="payment-wrapper">
            <NavComponent></NavComponent>
            <section className="page-title">
                <Link to="/feed" className="back">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4a5565">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </Link>
                <div className="title-subtitle">    
                    <h1>Get this product!</h1>
                    <h3>Enter your details to complete the payment</h3>
                </div>
            </section>
            <section className="payment-details">
                <section className="product-details">
                    <h3 className="details-header">Order Summary</h3>
                    <div className="product">
                        <div className="product-image">
                            <img src="public/assets/blender.webp" alt="" />

                        </div>
                        <div className="product-info">
                            <div className="name-price">
                                <div className="product-name">Turbo Blender</div>
                                <div className="price">€19.99</div>
                            </div>
                            <div className="product-tags">
                                <div className="category">Kitchen tool</div>
                                <div className="quantity">Qty: 1</div>
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>€19.99</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>FREE</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>€19.99</span>
                    </div>
                    <div className="secure-box">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fd9a00">
                            <path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm410-350q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/>
                        </svg>
                        <p>
                            Secure & Scripted Checkout

                        </p>
                    </div>
                </section>
                <PaymentForm></PaymentForm>
            </section>

        </section>
    )
}

export default Payment
