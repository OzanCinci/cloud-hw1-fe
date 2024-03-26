import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


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

const UserListContainer = styled.div`
    margin-bottom: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 15px;
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
    const [oldPassword, setOldPassword] = useState(null);
    const nav = useNavigate();

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
    const [users,setUsers] = useState(null);


    useEffect(()=>{
        if (!account.email || !account.password) {
             const accountInfo = readFromLocalStorage("account-hw1");
             if (!accountInfo) return;
             //const {email,password} = accountInfo;
             setAccount(accountInfo);
             setOldPassword(accountInfo.password);
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
                console.log("LOGIN SUCCESS: ", json);
                const userData = {
                    ...json._doc,
                    password: login.password,
                    email: login.email,
                };
                writeToLocalStorage("account-hw1",userData);
                setErr(null);
                setAccount(userData);
                setOldPassword(userData.password);
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
                role: "nonADMIN"
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
                setOldPassword(userData.password);
            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
            setErr(error.message);
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(account);
        const newPassword = account.password;

        if (!account.email || !account.password) {
            setErr("Please fill the email and password field");
            return;
        }
        
        // This is a simple POST request with a JSON body.
        fetch('http://localhost:3001/users/update-account', {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...account,
                oldPassword: login.password || signUp.password
            }),
        })
        .then(response =>response.json())
        .then(json => {
            console.log("JSON: ",json);
            if (json.message)
                setErr(json.message);
            else {
                const userData = {
                    ...json._doc,
                    token : json.token,
                    userId : json.userId,
                    password: newPassword,
                };
                console.log("UPDATE SUCCESS: ", userData);
                writeToLocalStorage("account-hw1",userData);
                setErr(null);
                setAccount(userData);
                setOldPassword(userData.password);
            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
            setErr(error.message);
        });
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("account-hw1");
        setAccount({     
            email: null,
            password: null,
            name: null,
            surname: null,
            phoneNumber: null,
            userId: null,
        }) 
        setLogin({       
            email: null,
            password: null,
        }) 
        setSignUp({        
            email: null,
            password: null,
            name: null,
            surname: null,
            phoneNumber: null,
        }) 
        setOldPassword(null);
    }

    const handleAddItem = (e, type) => {
        e.preventDefault();
        nav("/add-" + type);
    }

    const handleGetUsers = (e) => {
        e.preventDefault();
        console.log(account.email,account.password);
        
        // This is a simple get request with a JSON body.
        fetch('http://localhost:3001/users', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: account.email,
                password: account.password
            }),
        })
        .then(response =>response.json())
        .then(json => {
            if (json.message)
                setErr(json.message);
            else {
                console.log("USER: ",json)
                setUsers(json);
            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
            setErr(error.message);
        });
    }

    const handleDeleteUser = (e,email) => {
        e.preventDefault();

        e.preventDefault();
        console.log(account.email,account.password);
        
        // This is a simple get request with a JSON body.
        fetch('http://localhost:3001/users/' + email, {
            method: 'DELETE', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: account.email,
                password: account.password
            }),
        })
        .then(response =>response.json())
        .then(json => {
            if (json.message)
                setErr(json.message);
            else {
                console.log("USER: ",json)
                const newUsers = users.filter(item=>item.email!==email);
                setUsers(newUsers);
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
                    <div>
                        <h4>Update your account</h4>
                        <InputWrapper>
                            <TextField 
                                value={account.email} onChange={e=>setAccount({...account, email: e.target.value})}
                                InputProps={{
                                    readOnly: true,
                                  }} 
                                required id="email" label="Email" variant="outlined" />
                            <TextField 
                                value={account.name} onChange={e=>setAccount({...account, name: e.target.value})}
                                id="name" label="Name" variant="outlined" />
                            <TextField 
                                value={account.surname} onChange={e=>setAccount({...account, surname: e.target.value})}
                                id="surname" label="Surname" variant="outlined" />
                            <TextField 
                                value={account.phoneNumber} onChange={e=>setAccount({...account, phoneNumber: e.target.value})}
                                id="phoneNumber" label="Phone Number" variant="outlined" />
                            <TextField 
                                value={account.password} onChange={e=>setAccount({...account, password: e.target.value})}
                                required id="password" label="Password" variant="outlined" type='password'/>
                        </InputWrapper>
                        <Button onClick={(e)=> handleUpdate(e)} size='large' variant="outlined">Update</Button>
                        <Button onClick={(e)=> handleLogout(e)} size='large' variant="outlined">Logout</Button>
                    </div>

                    <br></br>
                    <br></br>
                    <Button className='mx-2' onClick={(e)=> handleAddItem(e, "computer")} size='large' variant="outlined">Add Computer</Button>
                    <Button onClick={(e)=> handleAddItem(e, "vehicle")} size='large' variant="outlined">Add Vehicle</Button>
                    <Button className='mx-2' onClick={(e)=> handleAddItem(e, "phone")} size='large' variant="outlined">Add Phone</Button>
                    <Button onClick={(e)=> handleAddItem(e, "private-lesson")} size='large' variant="outlined">Add Private Lesson</Button>

                    {
                        
                        account?.role==="ADMIN" && 
                        <>
                            <br></br>
                            <br></br>
                            <Button onClick={(e)=> handleGetUsers(e)} size='large' variant="outlined">List All Users</Button>
                            <br></br>
                            <br></br>
                            {
                                users!==null && 
                                <UserListContainer>
                                {
                                    users.map((item,index)=>{
                                        return (
                                            <div key={index} className='d-flex'>
                                                <div>
                                                    <Button color='warning' className='mx-3' onClick={(e)=> handleDeleteUser(e, item.email)} size='large' variant="outlined">X</Button>
                                                </div>
                                                <div>
                                                    <div>{item.email}</div>
                                                    <div>USER:  {`${item.name || "No name"} - ${item.surname || "No surname"}`}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <>
                                {
                                    users!==null && users.length === 0 && <div>No users found!</div>
                                }
                                </>
                                </UserListContainer> 

                            }
                        </>
                    }
                </div>
            )
        }

    </div>
  )
}

export default Account