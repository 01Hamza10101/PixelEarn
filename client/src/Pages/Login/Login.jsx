import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SocialMedia from './SocialMedia.png';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import {LoginUser} from '../../Redux/Userslice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formdata,setFormdata] = useState({});
    
    const handleData = (e) => { 
        const { name, value } = e.target;
         setFormdata((prevFormdata) =>
          ({ ...prevFormdata, [name]: value })
          )
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault(); 
        dispatch(LoginUser(formdata));
        console.log("Login",formdata);
    }
    return (
        <div className='Login'>
            <div className="illustration">
                <img src={SocialMedia} alt="img" />
            </div>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <h1>Log in to your account</h1>
                <h2>Don't have an account? <span onClick={() => navigate('/Signup')}>Sign Up</span></h2>
                <div className="Email">
                    <label htmlFor="Email">Email</label>
                    <input type="email" name='Email' onChange={handleData} required />
                </div>
                <div className="Password">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name='Password' onChange={handleData} required />
                </div>
                <button className="Login-Button" type='submit'>Login</button>
            </form>
        </div>
    )
}
export default Login;