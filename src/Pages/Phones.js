import React, { useEffect, useState } from 'react';
import usePaginatedFetch from '../hooks/usePaginatedFetch';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
import { readFromLocalStorage } from '../utils/account';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

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

const PaginationDiv = styled.div`
    width: 700px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
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

function Phones() {
    const [auth,setAuth] = useState(false);
    const [selectedItem,setSelectedItem] = useState({"test":12});
    const [user,setUser ] = useState(null);
    const [pageNumber,setPageNumber] = useState(1);
    const [url, setUrl] = useState("/phones");
    const [config, setConfig] = useState({
        "method": "get",
        "headers": {
            'Content-Type': 'application/json',
            }
      });
    const {data, loading, error} = usePaginatedFetch(url,config,pageNumber, "http://localhost:3001");
      console.log("COMPUTERS DATA: ", data);


    const openComputerDetail = (item) => {
        setSelectedItem(item)
        console.log("SELECTED ITEM: ",item);
        const button = document.getElementById("computer-detail");
        if (button)
            button.click();
    }

    const handleDelete = (e,itemId) => {
        e.preventDefault();
        const req = {
            userData: {
                email: user.email,
                password: user.password,
            }
        }

        console.log(user)
        console.log(req);
        console.log('http://localhost:3001/phones/' + itemId);
        // This is a simple POST request with a JSON body.
        fetch('http://localhost:3001/phones/' + itemId, {
            method: 'DELETE', 
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
                setPageNumber(prev=>prev+1);
                setPageNumber(prev=>prev-1);
                const button = document.getElementById("close-button-phones");
                if (button)
                    button.click();
            }
        })
    }

    useEffect(()=>{
        const user = readFromLocalStorage("account-hw1");
        console.log("USER: ",user);
        if (!user)
            return;
        setAuth(true);
        setUser(user);
    },[]);

  return (
    <div>
        <button style={{display: "none"}} id='computer-detail' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Details</h5>
                    <button id='close-button-phones' type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {
                        <>
                            <div>
                                {
                                    (user?.role==="ADMIN" || user?._id==selectedItem.userId) && <div> <Button style={{marginBottom:"30px"}} onClick={(e)=> handleDelete(e,selectedItem._id)} size='large' variant="outlined">Delete</Button> </div>
                                }
                            </div>
                            {selectedItem.image && <CustomImage src={selectedItem.image} alt='item-image'/>}
                            {selectedItem.price && <div>Price: ${selectedItem?.price}</div>}
                            {selectedItem.title && <div>Title: {selectedItem?.title}</div>}
                            {selectedItem.brand && <div>Brand: {selectedItem?.brand}</div>}
                            {selectedItem.model && <div>Model: {selectedItem?.model}</div>}
                            {selectedItem.operatingSystem && <div>OS: {selectedItem?.operatingSystem}</div>}
                            {selectedItem.processor && <div>Processor: {selectedItem?.processor}</div>}
                            {selectedItem.ram && <div>RAM: {selectedItem?.ram} (GB)</div>}
                            {selectedItem.storage && <div>storage: {selectedItem?.storage}</div>}
                            {selectedItem.description && <div>Description: {selectedItem?.description}</div>}
                            {selectedItem.batteryCapacity && <div>Battery Capacity: {selectedItem?.batteryCapacity}</div>}
                            {selectedItem.year && <div>Year: {selectedItem?.year} </div>}
                            {selectedItem.cameraSpecifications && selectedItem.cameraSpecifications?.main && <div>main: {selectedItem.cameraSpecifications?.main} </div>}
                            {selectedItem.cameraSpecifications && selectedItem.cameraSpecifications?.front && <div>front: {selectedItem.cameraSpecifications?.front} </div>}
                            {selectedItem.cameraSpecifications && selectedItem.cameraSpecifications?.periscopeTelephoto && <div>periscopeTelephoto: {selectedItem.cameraSpecifications?.periscopeTelephoto} </div>}
                            {selectedItem.cameraSpecifications && selectedItem.cameraSpecifications?.telephoto && <div>telephoto: {selectedItem.cameraSpecifications?.telephoto} </div>}
                            {selectedItem.cameraSpecifications && selectedItem.cameraSpecifications?.ultraWide && <div>ultraWide: {selectedItem.cameraSpecifications?.ultraWide} </div>}
                            {selectedItem.userContact && <div>Seller: {selectedItem.userContact?.name} {selectedItem.userContact?.surname}</div> }
                            {selectedItem?.userContact?.email && (auth || selectedItem.showDetailToEveryOne) && <div>Email: {selectedItem.userContact?.email}</div> }
                            {selectedItem?.userContact?.phoneNumber && (auth || selectedItem.showDetailToEveryOne) && <div>Phone Number: {selectedItem.userContact?.phoneNumber}</div>}
                        </>
                    }
                </div>
                </div>
            </div>
        </div>


        {error && <ModifiedAlert severity="error">{error}</ModifiedAlert>}
        {loading && <div>
                <CircularProgress />
            </div>}
        {
            data && !loading && 
            <>
                <PaginationDiv>
                    <Button disabled={data.currentPage===1} onClick={()=> setPageNumber(prev=>prev-1)} size='large' variant="outlined">Prev</Button>
                    <span>Page: {data.currentPage} of {data.totalPages}</span>
                    <Button disabled={data.totalPages===data.currentPage} onClick={()=> setPageNumber(prev=>prev+1)} size='large' variant="outlined">Next</Button>
                </PaginationDiv>
                <Container>
                    {
                        data.data.map((item,index)=> {
                            return (
                                <SingleComputer onClick={()=>openComputerDetail(item)} key={index}>
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
            </>
        }
    </div>
  )
}

export default Phones