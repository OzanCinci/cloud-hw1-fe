import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    border: 1px solid red;
`;

const LogoImg = styled.img`
    height: 80px;
    width: auto;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    direction: row;
    justify-content: space-around;
    align-items: center;
`;

const Links = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const Link = styled.div`
    cursor: pointer;
    font-weight: 600;
    color: ${props=>props.selected?"#17A2B8":"black"};

    position: relative;

    &:hover {
        cursor: pointer;

        &::after {
        transform: scaleX(1);
        transform-origin: left;
        }
    }

    &::after {
        z-index: -1;
        content: "";
        position: absolute;
        left: 0;
        bottom: -40%;
        width: 100%;
        height: 5px;
        background-color: #17A2B8;
        transform: scaleX(0);
        transform-origin: right;
        border: 1px solid #17A2B8;
        transition: transform 250ms ease-in;
    }
`;


function Navbar() {
    const nav = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [selected,setSelected] = useState(currentPath.substring(1,currentPath.length));


    const handleRedirection = (path) => {
        nav("/" + path);
        setSelected(path);
    };

  return (
    <Container>
        <Wrapper>
            <LogoImg src={Logo} alt='logo-of-cengten'/>
            <Links>
                <Link selected={selected==='computers'} onClick={()=>handleRedirection('computers')}>Computers</Link>
                <Link selected={selected==='vehicles'} onClick={()=>handleRedirection('vehicles')}>Vehicles</Link>
                <Link selected={selected==='phones'} onClick={()=>handleRedirection('phones')}>Phones</Link>
                <Link selected={selected==='private-lessons'} onClick={()=>handleRedirection('private-lessons')}>Private Lessons</Link>
            </Links>
        </Wrapper>
    </Container>
  )
}

export default Navbar