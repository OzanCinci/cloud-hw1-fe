import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';


const ModifiedAlert = styled(Alert)`
  width: 35%;
  margin: 10px auto;
  font-size: 18px !important;
  text-align: center;
`;


export const readFromLocalStorage = (keyToCheck) => {
    const value = localStorage.getItem(keyToCheck);
    return value !== null ? JSON.parse(value) : null;
};

export const writeToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const InputWrapper = styled.div`
    width: 430px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: auto;
`;

function Account() {
    const [account,setAccount] = useState({
        email: null,
        password: null,
        name: null,
        surname: null,
        phoneNumber: null,
        userId: null,
    });
    const [login,setLogin] = useState({
        email: null,
        password: null,
    });
    const [signUp,setSignUp] = useState({
        email: null,
        password: null,
        name: null,
        surname: null,
        phoneNumber: null,
    });
    const [selection,setSelection] = useState(0);
    const [err, setErr] = useState(null);


    useEffect(()=>{
        if (!account.email || !account.password) {
             const accountInfo = readFromLocalStorage("account-hw1");
             if (!accountInfo) return;
             const {email,password} = accountInfo;
             setAccount({email,password});
        }
    },[]);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(login);

        if (!login.email || !login.password) {
            setErr("Please fill the email and password field");
            return;
        }
        
        // This is a simple POST request with a JSON body.
        fetch('http://localhost:3001/users/log-in', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...login
            }),
        })
        .then(response =>response.json())
        .then(json => {
            console.log("JSON: ",json);
            if (json.message)
                setErr(json.message);
            else {
                console.log("JSON SUCCESS: ", json);
                const userData = {
                    ...json,
                    password: login.password,
                    email: login.email,
                };
                writeToLocalStorage("account-hw1",userData);
                setErr(null);
                setAccount(userData);
            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
            setErr(error.message);
        });
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(signUp);

        if (!signUp.email || !signUp.password) {
            setErr("Please fill the email and password field");
            return;
        }
        
        // This is a simple POST request with a JSON body.
        fetch('http://localhost:3001/users/sign-up', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...signUp,
                role: "ADMIN"
            }),
        })
        .then(response =>response.json())
        .then(json => {
            console.log("JSON: ",json);
            if (json.message)
                setErr(json.message);
            else {
                const userData = {
                    ...signUp,
                    token : json.token,
                    userId : json.userId
                };
                console.log("JSON SUCCESS: ", userData);
                writeToLocalStorage("account-hw1",userData);
                setErr(null);
                setAccount(userData);
            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
            setErr(error.message);
        });
    }

  return (
    <div>
        {
            err!==null && <ModifiedAlert severity="error">{err}</ModifiedAlert>
        }
        {
            account.email === null 
            ? (
                <div>

                    {
                        selection === 0 
                            ? (
                                <>
                                    <InputWrapper>
                                            <TextField 
                                                value={login.email} onChange={e=>setLogin({...login, email: e.target.value})}
                                                required id="email" label="Email" variant="outlined" />
                                            <TextField 
                                                value={login.password} onChange={e=>setLogin({...login, password: e.target.value})}
                                                id="password" label="Password" variant="outlined" 
                                                required type='password'
                                                />
                                    </InputWrapper>
                                    <div style={{marginTop: "10px"}}>Doesn't have an account yet? </div>
                                    <div style={{marginBottom: "10px"}}><span onClick={()=>setSelection(1)} style={{textDecoration: "underline", cursor:"pointer"}}>click here</span> please!</div>
                                    <Button onClick={(e)=> handleLogin(e)} size='large' variant="outlined">Login</Button>
                                </>
                            )
                            : (
                                <>
                                    <InputWrapper>
                                            <TextField 
                                                value={signUp.email} onChange={e=>setSignUp({...signUp, email: e.target.value})}
                                                required id="email" label="Email" variant="outlined" />
                                            <TextField 
                                                value={signUp.name} onChange={e=>setSignUp({...signUp, name: e.target.value})}
                                                id="name" label="Name" variant="outlined" />
                                            <TextField 
                                                value={signUp.surname} onChange={e=>setSignUp({...signUp, surname: e.target.value})}
                                                id="surname" label="Surname" variant="outlined" />
                                            <TextField 
                                                value={signUp.phoneNumber} onChange={e=>setSignUp({...signUp, phoneNumber: e.target.value})}
                                                id="phoneNumber" label="Phone Number" variant="outlined" />
                                            <TextField 
                                                value={signUp.password} onChange={e=>setSignUp({...signUp, password: e.target.value})}
                                                required id="password" label="Password" variant="outlined" type='password'/>
                                    </InputWrapper>
                                    <div style={{marginTop: "10px"}}>Already have an account? </div>
                                    <div style={{marginBottom: "10px"}}><span onClick={()=>setSelection(0)} style={{textDecoration: "underline", cursor:"pointer"}}>click here</span> please!</div>
                                    <Button onClick={(e)=> handleSignUp(e)} size='large' variant="outlined">Sign Up</Button>
                                </>
                            )
                    }



                </div>
            ) 
            : (
                <div>
                    yes account
                </div>
            )
        }

    </div>
  )
}

export default Account