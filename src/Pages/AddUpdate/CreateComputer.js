import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const sampleComputerObj = {
    title: null,
    type: null,
    brand: null,
    model: null,
    year: null,
    processor: null,
    ram: null,
    storage: {
        SSD: null,
        HDD: null  // Optional, for computers with HDD
    },
    graphicsCard: null,
    operatingSystem: null,
    price: null,
    image: null,
    description: null,
    activate: true,  // New boolean field
    showDetailToEveryOne: true  // New boolean field
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 430px;
    margin: auto;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    justify-content: flex-start;
    align-items: center;
`;

export const readFromLocalStorage = (keyToCheck) => {
    const value = localStorage.getItem(keyToCheck);
    return value !== null ? JSON.parse(value) : null;
};

function CreateComputer() {
    const [computer, setComputer] = useState(sampleComputerObj);
    const nav = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'SSD' || name === 'HDD') {
            setComputer(prevState => ({
                ...prevState,
                storage: {
                    ...prevState.storage,
                    [name]: value
                }
            }));
        } else if (type === 'checkbox') {
            setComputer(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            setComputer(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(computer);

        const user = readFromLocalStorage("account-hw1");
        console.log(user);

        const computerData = Object.entries(computer).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});


        const req = {
            computerData: {...computerData},
            userData: {
                email: user.email,
                password: user.password
            }
        };

        // This is a simple POST request with a JSON body.
        fetch('http://localhost:3001/computers', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...req
            }),
        })
        .then(response =>response.json())
        .then(json => {
            if (json.message)
                console.log("JSON: ",json);
            else {
                console.log("Create SUCCESS: ", json);
            }
        })

        nav("/computers");
    }


  return (
    <div>
        <h4>Create/Update Computer</h4>
        <Container>
            <Column>
                <input type="text" name="title" placeholder="Title" value={computer.title} onChange={handleChange} required={true}/>
                <br/>
                <br/>
                <input type="text" name="type" placeholder="Type" value={computer.type} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="brand" placeholder="Brand" value={computer.brand} onChange={handleChange} required={true}/>
                <br/>
                <br/>
                <input type="text" name="model" placeholder="Model" value={computer.model} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="year" placeholder="Year" value={computer.year} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="processor" placeholder="Processor" value={computer.processor} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="ram" placeholder="RAM" value={computer.ram} onChange={handleChange} />
                <br/>
                <br/>
                {/* New boolean fields as checkboxes */}
                <div>
                    <input type="checkbox" name="activate" checked={computer.activate} onChange={handleChange} />
                    <label>Activate</label>
                </div>
            </Column>

            <Column>
                <input type="text" name="SSD" placeholder="SSD Storage" value={computer.storage.SSD} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="HDD" placeholder="HDD Storage" value={computer.storage.HDD} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="graphicsCard" placeholder="Graphics Card" value={computer.graphicsCard} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="operatingSystem" placeholder="Operating System" value={computer.operatingSystem} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="price" placeholder="Price" value={computer.price} onChange={handleChange} />
                <br/>
                <br/>
                <input type="text" name="image" placeholder="Image Path" value={computer.image} onChange={handleChange} />
                <br/>
                <br/>
                <textarea name="description" placeholder="Description" value={computer.description} onChange={handleChange} />
                <br/>
                <div>
                    <input type="checkbox" name="showDetailToEveryOne" checked={computer.showDetailToEveryOne} onChange={handleChange} />
                    <label>Show Detail to Everyone</label>
                </div>
        </Column>

        </Container>
        <br/>
        <Button onClick={(e)=> handleSubmit(e)} size='large' variant="outlined">Save</Button>
    </div>
  )
}

export default CreateComputer