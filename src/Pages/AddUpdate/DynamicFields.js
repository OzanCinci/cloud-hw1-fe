import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const readFromLocalStorage = (keyToCheck) => {
    const value = localStorage.getItem(keyToCheck);
    return value !== null ? JSON.parse(value) : null;
};


function DynamicFields() {
    const {category,id} = useParams();
    const emptyObject = possibleMatches[category];

    useEffect(()=>{
        const data = readFromLocalStorage("updateData");
    },[]);


  return (
    <div>DynamicFields</div>
  )
}

export default DynamicFields