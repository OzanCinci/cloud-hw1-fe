import React from 'react';
import { useParams } from 'react-router-dom';
import Computers from './Computers';


function getPage(category) {
    console.log("current: ",category);
    switch(category) {
        case "computers":
            return <Computers/>;
        case "vehicles":
            return;
        case "phones":
            return;
        case "private-lessons":
            return;
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
        {`current category: ${category}`}
    </>
  )
}

export default HomePage