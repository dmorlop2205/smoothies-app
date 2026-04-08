import { Link } from 'react-router-dom'
import './Register.css'
import RegisterForm from '../components/RegisterForm'
function Register() {
  return (
    <section className="register-wrapper">
        <Link to="/feed" className="back-button">
            <div className="back">
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4a5565">
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
            </div>
    
            <h3 className="back-text">Back</h3>
        </Link>
        <div className="register-title">
            <h1 className="title">Register in BlendUs</h1>
            <h3 className="subtitle">Start sharing your smoothies with other people!</h3>
        </div>
        <RegisterForm></RegisterForm>
    </section>
  )
}

export default Register
