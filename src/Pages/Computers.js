import React, { useState } from 'react';
import usePaginatedFetch from '../hooks/usePaginatedFetch';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

const ModifiedAlert = styled(Alert)`
  width: 35%;
  margin: 10px auto;
  font-size: 18px !important;
  text-align: center;
`;

const SingleComputer = styled.div`
    
    border-radius: 6px;
    width: 90%;
    margin: auto;
    padding: 40px 5px;
    padding-bottom: 10px;
    cursor: pointer;

    -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease;

    &:hover {
        -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Creates two columns of equal width */
    grid-gap: 10px; /* Adjusts the gap between the grid items */
    width: 850px;
    margin: auto;
`;

const CustomImage = styled.img`
    height: 120px;
    margin-bottom: 20px;
`;

function Computers() {
    const [pageNumber,setPageNumber] = useState(0);
    const [url, setUrl] = useState("/computers");
    const [config, setConfig] = useState({
        "method": "get",
        "headers": {
            'Content-Type': 'application/json',
            }
      });
    const {data, loading, error} = usePaginatedFetch(url,config,pageNumber, "http://localhost:3001");
      console.log("COMPUTERS DATA: ", data);


    const openComputerDetail = (pcId) => {
        console.log("ID COMPUTER: ", pcId);
    }

  return (
    <div>
        {error && <ModifiedAlert severity="error">{error}</ModifiedAlert>}
        {loading && <div>LOADING...</div>}
        {
            data && 
                <Container>
                    {
                        data.data.map((item,index)=> {
                            return (
                                <SingleComputer onClick={()=>openComputerDetail(item._id)} key={index}>
                                    <CustomImage src={item.image} alt='item-image'/>
                                    <h4>Title: {item.title}</h4>
                                    <div>Model: {item.model}</div>
                                    <div>Brand: {item.brand}</div>
                                    <div>Price: ${item.price}</div>
                                </SingleComputer>
                            )
                        })
                    }
                </Container>
        }
    </div>
  )
}

export default Computers