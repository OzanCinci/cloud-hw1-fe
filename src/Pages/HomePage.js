import React from 'react';
import { useParams } from 'react-router-dom';


function HomePage() {
    const {category} = useParams();

  return (
    <>
        <div>Welcome to Ceng'ten! </div>
        <div>Ceng495 Cloud hw1 </div>
        <div> You are displaying {category}</div>
    </>
  )
}

export default HomePage