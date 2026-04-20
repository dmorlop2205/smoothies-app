import './LoginForm.css';

function LoginForm() {
  return (
    <form className='login-form'>
        <label className="label" htmlFor="login-inputs">Log in to BlendUs</label>
        <div id="login-inputs" className="login-inputs">
            <input className="text-input" type="text" id="username" placeholder='Username or email'/>
            <input className="text-input" type="password" id="password" placeholder='Password'/>
        </div>
        <button className="btn form-btn login-btn" type="submit">Log in</button>
        <a className="forgot-password" href="#">Forgot Your password?</a>
        <button className="btn register-btn" type="button">Create new account</button>      

    </form>
  )
}

export default LoginForm
