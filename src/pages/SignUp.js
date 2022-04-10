import './SignUp.css';
import { FaUserCircle,FaUser,FaLock } from "react-icons/fa";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";


const SignUp=()=>{
    const navigate= useNavigate();
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState([]);
  
    const [userData, setUserData] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const handleChange = (e) => {
        setUserData(prev=>({ ...prev, [e.target.name]: e.target.value }));
        e.preventDefault();
    
      };
      const validateUser = () => {
        if (
          userData?.username.trim().length === 0 ||   
          userData?.email.trim().length === 0 ||
          userData?.password.trim().length === 0 ||
          confirmPassword?.confirm.trim().length === 0 
        ) {
          console.error("wrong inputs");
          setErrors([
            ...errors,
            "Enter full data.",
          ]);
          setShowError(true);
          return false;
        }
        if (userData?.username.length > 60 || userData?.username.length < 3) {
          setErrors([
            ...errors,
            "Name is not valid, should be less than 60 characters more than 2",
          ]);
          setShowError(true);
    
          return false;
        }
        if (userData?.password !== confirmPassword?.confirm) {
          setErrors([...errors, "Password doesn't match."]);
          console.log('this')
          setShowError(true);
    
          return false;
        }
    
        setShowError(false);
        return true;
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        let status= validateUser();
        if (status) {
           fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            
            
            headers: {
              'Accept': 'application/json, text/plain',
              "Content-type": "application/json",
              
            },
            body: JSON.stringify(userData),
          }).catch(err=> console.log(err))
          .then((data) => {
            
             
              if(data.status==200){
              navigate('/');              }
              console.log(data);
              console.log(userData);
            });
            
    
          setShowError(false);
        } else {
          setShowError(true);
          console.log(errors)
        }
      };
    return(
        <div>
        <div className="container">
         <div className="form-box">
           <div className="header-form">
             <h4 className="text-primary text-center"><FaUserCircle style={{fontSize:"110px"}}></FaUserCircle></h4>
             <div className="image">
             </div>
           </div>
          
           <div className="body-form">
            <form onSubmit={handleClick}>
               <div className="input-group mb-3">
    <div className="input-group-prepend">
     <span className="input-group-text"><FaUser></FaUser></span>
   </div>
   <input type="text" className="form-control" placeholder="Username" name="username"
                value={userData?.username}
                onChange={handleChange}  />
 </div>
 <div className="input-group mb-3">
    <div className="input-group-prepend">
     <span className="input-group-text"><FaUser></FaUser></span>
   </div>
   <input type="email" className="form-control" placeholder="email" name="email"
                value={userData?.email}
                onChange={handleChange} />
 </div>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
     <span className="input-group-text"><FaLock></FaLock></span>
   </div>
   <input type="password" className="form-control" placeholder="Password" name="password"
                value={userData?.Password}
                onChange={handleChange}/>
 </div>
 <div className="input-group mb-3">
    <div className="input-group-prepend">
     <span className="input-group-text"><FaLock></FaLock></span>
   </div>
   <input type="password" className="form-control" placeholder="confirm Password" name="confirm"
                value={userData?.confirm}
                onChange={(e) =>{
                  setConfirmPassword({
                    ...confirmPassword,
                    [e.target.name]: e.target.value,
                  });
                }}/>
 </div>
 <div className="erreurs">
      {showError && errors.map((element, key)=>(
            
               <div key={key} >{element}</div>
             
      ))}
       
      </div> 

  <button  className="btn btn-secondary btn-block">sign up</button>
  <div className="message">
 
  </div>
    </form>
             
           </div>
         </div>
        </div>
          
      </div>   

     )
};
export default SignUp;