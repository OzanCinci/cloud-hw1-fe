import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const sampleVehicleObj = {
    title: null,
    type: null,
    brand: null,
    model: null,
    year: null,
    color: null,
    engineDisplacement: null,
    fuelType: null,
    transmissionType: null,
    mileage: null,
    price: null,
    image: null,
    description: null,
    // Additional attributes for specific vehicle types
    batteryCapacity: null,  // For electric cars
    range: null,            // For electric cars
    bedCapacity: null,      // For caravans
    waterTankCapacity: null,// For caravans
    payloadCapacity: null,  // For trucks
    activate: true,  // New boolean field
    showDetailToEveryOne: true  // New boolean field
};

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


function CreateVehicle() {
    const [vehicle, setVehicle] = useState(sampleVehicleObj);
    const nav = useNavigate();

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (type === 'checkbox') {
            setVehicle(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            setVehicle(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(vehicle);

        const user = readFromLocalStorage("account-hw1");
        console.log(user);

        const vehicleData = Object.entries(vehicle).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        vehicleData.userId = user._id;

        const req = {
            vehicleData: {...vehicleData},
            userData: {
                email: user.email,
                password: user.password
            }
        };

        // This is a simple POST request with a JSON body.
        fetch('https://cloud-hw1-be.onrender.com/vehicles', {
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

        nav("/vehicles");
    }

    return (
        <div>
            <h4>Create/Update Vehicle</h4>
            <Container>
                <Column>
                    <input type="text" name="title" placeholder="Title" value={vehicle.title} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="type" placeholder="Type" value={vehicle.type} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="brand" placeholder="Brand" value={vehicle.brand} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="model" placeholder="Model" value={vehicle.model} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="year" placeholder="Year" value={vehicle.year} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="color" placeholder="Color" value={vehicle.color} onChange={handleChange} />

                    <br/>
                    {/* New boolean fields as checkboxes */}
                    <div>
                        <input type="checkbox" name="activate" checked={vehicle.activate} onChange={handleChange} />
                        <label>Activate</label>
                    </div>
                    <br/>
                    <div>
                        <input type="checkbox" name="showDetailToEveryOne" checked={vehicle.showDetailToEveryOne} onChange={handleChange} />
                        <label>Show Detail to Everyone</label>
                    </div>
                </Column>
                <Column>
                    <input type="text" name="engineDisplacement" placeholder="Engine Displacement" value={vehicle.engineDisplacement} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="fuelType" placeholder="Fuel Type" value={vehicle.fuelType} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="transmissionType" placeholder="Transmission Type" value={vehicle.transmissionType} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="mileage" placeholder="Mileage" value={vehicle.mileage} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="price" placeholder="Price" value={vehicle.price} onChange={handleChange} />
                    <br/>
                    <br/>
                    <input type="text" name="image" placeholder="Image Path" value={vehicle.image} onChange={handleChange} />
                    <br/>
                    <br/>
                    <textarea name="description" placeholder="Description" value={vehicle.description} onChange={handleChange} />
                </Column>
            </Container>
            <br/>
            <br/>
            <Button onClick={handleSubmit} size='large' variant="outlined">Save</Button>
        </div>
  );
}

export default CreateVehicle