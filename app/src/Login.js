import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import "./Login.css";
import AuthContext from './context/AuthProvider';

import axios from './api/axios';

// Get the LOGIN_URL for the DB (Users table)
const LOGIN_URL = '/auth';


const Login = () => {

    const { setAuth } = useContext(AuthContext); 
    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // focus on the username input
    useEffect(() => {
        userRef.current.focus();
    },[])

    // unset Error Message
    useEffect(() => {
        setErrMsg('');
    }, [user,pwd])

    // handle the login form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // send the login request to the server 
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}), {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            );
            
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            
            setAuth({user, pwd});
            setUser('');
            setPwd ('');
            setSuccess(true);
            
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            }else if(err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            }
            else if(err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }        
    }


  return (
    
    <div className="login_div">
        <img src="http://drive.google.com/uc?export=view&id=1JaWG_Q7V1kRHEMzrmK3vmTHbeTz2_So5" 
        alt="TradeNation" width={"35%"} height={"25%"} />
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br/>
                    <p>
                        <a href="/home">Go to Homepage</a>
                    </p>
                </section>
            ) : (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                ref={userRef} 
                type="text" 
                id="username" 
                onChange={(e) => setUser(e.target.value)} 
                autoComplete="off"
                value={user}	
                required
                />

                <label htmlFor="password">Password:</label>
                <input
                type="password" 
                id="password" 
                onChange={(e) => setPwd(e.target.value)} 
                value={pwd}	
                required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account? <br/> Contact Us at info@trade-nation.com

            </p>

        </section>
        )}
        </>
    </div>
       
  )
}

export default Login