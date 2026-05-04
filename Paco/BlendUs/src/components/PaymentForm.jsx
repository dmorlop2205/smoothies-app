import React from 'react'
import './PaymentForm.css'

function PaymentForm() {
  return (
    <form action="" className="payment-form">
        <div className="pf-wrapper">
            <div className="payment-name">
                <label htmlFor="name">Full name:</label>
                <input type="text" id="name" className="text-input" placeholder="Full name"/>
            </div>
            <div className="card-number">
                <label htmlFor="card-number">Card number:</label>
                <input type="text" id="card-number" className="text-input" placeholder="0000 0000 0000 0000"/>
            </div>
            <div className="date-cvc">
                <div className="expiry-date">
                    <label htmlFor="expiry">Expiry date:</label>
                    <input type="date" id="expiry" className="text-input"/>
                </div>
                <div className="cvc-number">
                    <label htmlFor="cvc">CVC:</label>
                    <input type="password" id="cvc" className="text-input" placeholder="***"/>
                </div>
            </div>
        </div>
        <div className="pf-footer">
            <div className="privacy">
                <input type="checkbox" className="checkbox"/>
                <label htmlFor="checkbox">I agree the privacy policy</label>
            </div>
            <div className="payment-btn">
                <button className="btn pay-btn">Go to payment</button>
            </div>
        </div>
    </form>

  )
}

export default PaymentForm
