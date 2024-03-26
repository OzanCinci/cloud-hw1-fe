import React from 'react';
import LandingImg from "../images/landing.png";
import styled from 'styled-components';

const CustomImage = styled.img`
    height: auto;
    width: 110vw;
    position: absolute;
    top: 5px;
    left: -5%;
    z-index: -4;
`;

function Landing() {
  return (
    <div>
        <CustomImage src={LandingImg} alt='landing-page-image'/>
    </div>
  )
}

export default Landing