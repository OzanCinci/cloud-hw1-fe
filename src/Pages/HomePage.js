import React from 'react';
import { useParams } from 'react-router-dom';
import Computers from './Computers';
import Vehicles from './Vehicles';
import Phones from './Phones';
import PrivateLessons from './PrivateLessons';


function getPage(category) {
    console.log("current: ",category);
    switch(category) {
        case "computers":
            return <Computers/>;
        case "vehicles":
            return <Vehicles/>;
        case "phones":
            return <Phones/>; 
        case "private-lessons":
            return <PrivateLessons/>;
        default:
            return <Computers/>;
    }
}

function HomePage() {
    const {category} = useParams();

  return (
    <>
        {
            getPage(category)
        }
    </>
  )
}

export default HomePage