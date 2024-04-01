import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

const sampleLessonObj = {
    title: null,
    tutorName: null,
    lessons: [],
    location: null,
    duration: null,
    price: null,
    image: null,
    description: null,
    //customFields: {}, // Assuming custom fields can be any key-value pairs
    activate: true, // Assuming default true
    showDetailToEveryOne: true // Assuming default true
}

const possibleMatches = {
    "computers": sampleComputerObj,
    "phones":samplePhoneObj,
    "private-lessons": sampleLessonObj,
    "vehicles": sampleVehicleObj,
}

function isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
}

function cleanObject(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        cleanObject(obj[key]);
        if (obj[key] === null || isEmptyObject(obj[key]))
        delete obj[key];
      } else if (obj[key] === null || obj[key] == "") {
        delete obj[key];
      }
    });
  }

const readFromLocalStorage = (keyToCheck) => {
    const value = localStorage.getItem(keyToCheck);
    return value !== null ? JSON.parse(value) : null;
};

const InputField = ({ label, value, onChange }) => (
    <div>
      <label>{label}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );


function DynamicFields() {
    const nav = useNavigate();
    const {category,id} = useParams();
    const emptyObject = possibleMatches[category];
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [data, setData] = useState(null);
    const handleChange = (path, value) => {
        const keys = path.split('.');
        setData((currentData) => {
          const newData = { ...currentData };
          let current = newData;
          for (let i = 0; i < keys.length - 1; i++) {
            if (current[keys[i]] === undefined) {
              current[keys[i]] = {};
            }
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          return newData;
        });
      };

    useEffect(()=>{
        const obj = readFromLocalStorage("updateData");
        console.log(obj);
        delete obj.userContact
        delete obj.userId
        delete obj.__v
        delete obj._id
        delete obj.createdAt
        delete obj.updatedAt

        const combinedObject = Object.keys(emptyObject).reduce((obj, key) => {
            obj[key] = null;
            return obj;
          }, {});
        
          // Add all fields from the original object, overwriting template values
          for (const key in obj) {
            combinedObject[key] = obj[key];
          }
      
        setData(combinedObject)
    },[]);



    const handleUpdateRequest = (body) => {        
        // This is a simple POST request with a JSON body.
        fetch(`https://cloud-hw1-be.onrender.com/${category}/${id}`, {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body
            }),
        })
        .then(response =>response.json())
        .then(json => {
            console.log("JSON: ",json);
        })
        .catch((error) => {
        });
    }



    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("data to be updated: ",data);
        cleanObject(data);
        console.log("CLEAN: ", data);
        const user = readFromLocalStorage("account-hw1");
        const body = {
            data: { 
                ...data
            },
            userData: { 
                email: user.email,
                password: user.password
            }
        };
        console.log("BODY: ",body);
        handleUpdateRequest(body);
        nav("/" + category);
    }

    const addField = () => {
        if (!newKey) return; // Don't add if the key is empty

        if (data.hasOwnProperty(newKey)) {
            window.alert('Key already exists.');
            return;
          }
    
        setData((currentData) => ({
          ...currentData,
          [newKey]: newValue
        }));
    
        // Reset new key-value inputs
        setNewKey('');
        setNewValue('');
      };

    const renderFields = (item, parentKey = '') => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return Object.keys(item).map((key) => renderFields(item[key], `${parentKey}${key}.`));
        } else {
          // Remove the trailing dot from the parentKey
          const cleanKey = parentKey.endsWith('.') ? parentKey.slice(0, -1) : parentKey;
          return (
            <InputField
              key={cleanKey}
              label={cleanKey}
              value={item}
              onChange={(newValue) => handleChange(cleanKey, newValue)}
            />
          );
        }
      };
      
    return <div>
        {renderFields(data)}
        <div>
            <br></br>
            <div>
                <input
                type="text"
                placeholder="Enter new key"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                />
                <input
                type="text"
                placeholder="Enter new value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                />
                <button onClick={addField}>Add Field</button>
            </div>
        </div>
        <div>
            <br></br>
            <button onClick={(e)=>handleUpdate(e)}>update</button>
        </div>
    </div>;
}

export default DynamicFields