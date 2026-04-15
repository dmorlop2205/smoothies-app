import './RegisterForm.css'

function RegisterForm() {
  return (
    <form className='register-form'>
        <div className="username">
            <label className="label" htmlFor="username">Username</label>
            <input className="text-input" type="text" id="username" placeholder='Username'/>
        </div>
        <div className="email">
            <label className="label" htmlFor="email">Email</label>
            <input className="text-input" type="email" id="email" placeholder='youremail@example.org'/>
        </div>
        <div className="birthdate">
            <label className="label" htmlFor="birthdate">Date of birth</label>
            <div className="day-month-year">
                <select defaultValue="" className="text-input birthdate-input" id="day">
                    <option value="" disabled>Day</option>
                    {[...Array(31)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <select defaultValue="" className="text-input birthdate-input" id="month">
                    <option value="" disabled>Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select defaultValue=""className="text-input birthdate-input" id="year">
                    <option value="" disabled>Year</option>
                    {[...Array(100)].map((_, i) => (
                        <option key={i} value={2026 - i}>{2026 - i}</option>
                    ))}

                </select>
            </div>
        </div>
        <div className="phone">
            <label className="label" htmlFor="phone">Phone number</label>
            <input className="text-input" type="tel" id="phone" placeholder='+34 123 456 789'/>
        </div>
        <div className="password">
            <label className="label" htmlFor="password">Password</label>
            <input className="text-input" type="password" id="password" placeholder='Password'/>
        </div>
        <div className="repeat-password">
            <label className="label" htmlFor="repeat-password">Repeat Password</label>
            <input className="text-input" type="password" id="repeat-password" placeholder='Repeat password'/>
        </div>
        <button className="btn register-btn">
            Register
        </button>
        <button className="btn secondary-btn"> 
            I already have an account
        </button>
    </form>
  )
}

export default RegisterForm
