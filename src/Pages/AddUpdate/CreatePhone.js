import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


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

const samplePhoneObj = {
    title: null,
    brand: null,
    model: null,
    year: null,
    operatingSystem: null,
    processor: null,
    ram: null,
    storage: null,
    cameraSpecifications: {
        Main: null,
        Front: null,
        PeriscopeTelephoto: null,
        Telephoto: null,
        UltraWide: null // For phones that have this feature
    },
    batteryCapacity: null,
    price: null,
    image: null,
    description: null,
    activate: true,  // New boolean field
    showDetailToEveryOne: true  // New boolean field
};


function CreatePhone() {
    const [phone, setPhone] = useState(samplePhoneObj);
    const nav = useNavigate();

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (name.startsWith('cameraSpecifications')) {
            const cameraKey = name.split('.')[1]; // Assuming name is like cameraSpecifications.Main
            setPhone(prevState => ({
                ...prevState,
                cameraSpecifications: {
                    ...prevState.cameraSpecifications,
                    [cameraKey]: value
                }
            }));
        } else if (type === 'checkbox') {
            setPhone(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            setPhone(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(phone);

        const user = readFromLocalStorage("account-hw1");
        console.log(user);

        const phoneData = Object.entries(phone).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        // Check if all cameraSpecifications fields are null
        const cameraSpecs = phoneData.cameraSpecifications;
        const allCameraSpecsNull = Object.values(cameraSpecs).every(val => val === null);

        if (allCameraSpecsNull) {
            delete phoneData.cameraSpecifications;  // Remove cameraSpecifications if all its fields are null
        } else {
            // Remove individual null fields from cameraSpecifications
            phoneData.cameraSpecifications = Object.entries(cameraSpecs).reduce((acc, [key, value]) => {
                if (value !== null) {
                    acc[key] = value;
                }
                return acc;
        }, {});
        }
        phoneData.userId = user._id;

        const req = {
            phoneData: {...phoneData},
            userData: {
                email: user.email,
                password: user.password
            }
        };

        // This is a simple POST request with a JSON body.
        fetch('https://cloud-hw1-be.onrender.com/phones', {
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

        nav("/phones");
    }

    return (
        <div>
            <h4>Create/Update Phone</h4>
            <Container>
                <Column>
                    <input type="text" name="title" placeholder="Title" value={phone.title} onChange={handleChange} />
                    <input type="text" name="brand" placeholder="Brand" value={phone.brand} onChange={handleChange} />
                    <input type="text" name="model" placeholder="Model" value={phone.model} onChange={handleChange} />
                    <input type="text" name="year" placeholder="Year" value={phone.year} onChange={handleChange} />
                    <input type="text" name="operatingSystem" placeholder="Operating System" value={phone.operatingSystem} onChange={handleChange} />
                    <input type="text" name="processor" placeholder="Processor" value={phone.processor} onChange={handleChange} />
                    <input type="text" name="ram" placeholder="RAM" value={phone.ram} onChange={handleChange} />
                    <input type="text" name="storage" placeholder="Storage" value={phone.storage} onChange={handleChange} />
                    <br/>
                    {/* New boolean fields as checkboxes */}
                    <div>
                        <input type="checkbox" name="activate" checked={phone.activate} onChange={handleChange} />
                        <label>Activate</label>
                    </div>
                    <br/>
                    <div>
                        <input type="checkbox" name="showDetailToEveryOne" checked={phone.showDetailToEveryOne} onChange={handleChange} />
                        <label>Show Detail to Everyone</label>
                    </div>
                </Column>
                <Column>
                    <input type="text" name="cameraSpecifications.Main" placeholder="Main Camera" value={phone.cameraSpecifications.Main} onChange={handleChange} />
                    <input type="text" name="cameraSpecifications.Front" placeholder="Front Camera" value={phone.cameraSpecifications.Front} onChange={handleChange} />
                    <input type="text" name="cameraSpecifications.PeriscopeTelephoto" placeholder="Periscope Telephoto Camera" value={phone.cameraSpecifications.PeriscopeTelephoto} onChange={handleChange} />
                    <input type="text" name="cameraSpecifications.Telephoto" placeholder="Telephoto Camera" value={phone.cameraSpecifications.Telephoto} onChange={handleChange} />
                    <input type="text" name="cameraSpecifications.UltraWide" placeholder="Ultra Wide Camera" value={phone.cameraSpecifications.UltraWide} onChange={handleChange} />
                    <input type="text" name="batteryCapacity" placeholder="Battery Capacity" value={phone.batteryCapacity} onChange={handleChange} />
                    <input type="text" name="price" placeholder="Price" value={phone.price} onChange={handleChange} />
                    <input type="text" name="image" placeholder="Image Path" value={phone.image} onChange={handleChange} />
                    <textarea name="description" placeholder="Description" value={phone.description} onChange={handleChange} />
                </Column>
            </Container>
            <br/>
            <br/>
            <Button onClick={handleSubmit} size='large' variant="outlined">Save</Button>
        </div>
  );
}

export default CreatePhone