import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
    margin: auto;
`;

export const readFromLocalStorage = (keyToCheck) => {
    const value = localStorage.getItem(keyToCheck);
    return value !== null ? JSON.parse(value) : null;
};

function CreatePrivateLesson() {
    const [lesson, setLesson] = useState(sampleLessonObj);
    const nav = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === 'checkbox') {
            setLesson(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else if (name === 'lessons') {
            // Assuming lessons are input as comma-separated values
            const lessonsArray = value.split(',').map(item => item);
            setLesson(prevState => ({
                ...prevState,
                lessons: lessonsArray
            }));
        } else if (name.startsWith('customFields')) {
            // For customFields, you'll need to handle them based on their structure
            // Assuming a simple key-value input for customFields for demonstration
            const fieldName = name.split('.')[1];
            setLesson(prevState => ({
                ...prevState,
                customFields: {
                    ...prevState.customFields,
                    [fieldName]: value
                }
            }));
        } else {
            setLesson(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(lesson);

        const user = readFromLocalStorage("account-hw1");
        console.log(user);

        const privateLessonData = Object.entries(lesson).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        privateLessonData.userId = user._id;
        const req = {
            privateLessonData: {...privateLessonData},
            userData: {
                email: user.email,
                password: user.password
            }
        };

        console.log("req private lessons: ",req);
        // This is a simple POST request with a JSON body.
        fetch('https://cloud-hw1-be.onrender.com/private-lessons', {
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

        nav("/private-lessons");
    }


  return (
    <div>
        <h4>Create/Update Computer</h4>
            <Column>
            <br/>
            <input type="text" name="title" placeholder="Title" value={lesson.title} onChange={handleChange} required={true}/>
            <br/>
            <input type="text" name="tutorName" placeholder="Tutor Name" value={lesson.tutorName} onChange={handleChange}/>
            <br/>
            <input type="text" name="location" placeholder="Location" value={lesson.location} onChange={handleChange}/>
            <br/>
            <input type="text" name="duration" placeholder="Duration" value={lesson.duration} onChange={handleChange}/>
            <br/>
            <input type="number" name="price" placeholder="Price" value={lesson.price} onChange={handleChange} required={true}/>
            <br/>
            <input type="text" name="image" placeholder="Image Path" value={lesson.image} onChange={handleChange}/>
            <br/>
            <textarea name="description" placeholder="Description" value={lesson.description} onChange={handleChange}/>
            {/* Assuming lessons is an array of strings */}
            <br/>
            <input type="text" name="lessons" placeholder="Lessons (comma separated)" value={lesson.lessons.join(',')} onChange={e => handleChange({...e, name: 'lessons', value: e.target.value.split(',')})}/>
            {/* For customFields, you would need a more complex UI depending on the structure and type of the fields */}
            <br/>
            <div>
                <input type="checkbox" name="activate" checked={lesson.activate} onChange={handleChange} />
                <label>Activate</label>
            </div>
            <br/>
            <div>
                <input type="checkbox" name="showDetailToEveryOne" checked={lesson.showDetailToEveryOne} onChange={handleChange} />
                <label>Show Detail to Everyone</label>
            </div>
            </Column>
        <br/>
        <Button onClick={(e)=> handleSubmit(e)} size='large' variant="outlined">Save</Button>
    </div>
  )
}

export default CreatePrivateLesson