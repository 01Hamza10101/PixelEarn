import { useNavigate , useLocation} from 'react-router-dom';
import SocialMedia from './SocialMedia.png';
import './Signup.css';
import { useState } from 'react';

import {SignupUser} from '../../Redux/Userslice';
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata,setFormdata] = useState({});
    const [ischecked,setIschecked] = useState(true);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const referralId = queryParams.get('RefreelID');

    const handleCheckboxChange = (e) => {
        setIschecked(e.target.checked);
        console.log(e.target.checked); // Logs true or false based on the checkbox state
    };

    const handleData = (e) => { 
        const { name, value } = e.target;
         setFormdata((prevFormdata) =>
          ({ ...prevFormdata, [name]: value })
          )
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(formdata.ConfirmPassword == formdata.Password && ischecked == true){
          let SignupRes = dispatch(SignupUser({
            Name:formdata.Name,
            Email:formdata.Email,
            Password:formdata.Password,
            referralId:referralId
          }));
;
            // if (SignupRes.payload.msg) {
            //   navigate('/login');
            // } else {
            //     console.error('Login failed:', resultAction.payload);
            // };
        // console.log('ok',SignupRes);
        };
        if(formdata.confirmpassword !== formdata.password){
          alert("Please enter correct password")
        };
      };
    
      return (
        <div className='SignUp'>
            <div className="SignUpForm">
                <h1>Create your account</h1>
                {/* <h1>Log in to your account</h1> */}
                <h2>Have an account? <span onClick={()=> navigate('/login')}>Log in now</span></h2>
                {/* <h2>Don't have an account? <span>Sign Up</span></h2> */}
                <div className="Name">
                    <label htmlFor="Name">Name</label>
                    <input type="text" name='Name' onChange={handleData} required/>
                </div>
                <div className="Email">
                    <label htmlFor="Email">Email</label>
                    <input type="email" name='Email' onChange={handleData} required />
                </div>
                <div className="Password">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name='Password' onChange={handleData} required/>
                </div>
                <div className="Password">
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="password" name='ConfirmPassword' onChange={handleData} required/>
                </div>
                <div className='Check-box'>
                    <input type="checkbox" checked={ischecked} onChange={handleCheckboxChange}/>
                    <div className='Check-box-div'>
                        I accept the
                        <a target="_blank" href="https://www.mongodb.com/legal/privacy-policy">Privacy Policy</a>
                        and the
                        <a target="_blank" href="https://www.mongodb.com/cloud-terms-and-conditions">Terms of Service</a>
                    </div>
                </div>
                <button className="SignUp-Button" onClick={handleSubmit}>Sign up</button>
            </div>
            <div className="illutration">
                <img src={SocialMedia} alt="img" />
            </div>
        </div>
    )
}
export default SignUp;