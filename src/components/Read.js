import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function Read(props) {
  const [APIData, setAPIData] = useState([]);
 
 

 

  useEffect(() => {
  
    getData()
  }, []);

  



  const getData = () => {
    axios
      .get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };


  const onDelete = (id) => {

    axios
      .delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`,{
        APIData
      }  )
      .then(() => {
        getData();
        dataDelete();
      })
    };
  
    
  
   
// delete toast message

  const dataDelete = () => 
  {toast((`user is deleted`),{
    position :toast.POSITION.TOP_RIGHT,
      type :toast.TYPE.ERROR,
      autoClose:6000
  });}



  
  return (
    <div className="container">
      <div>
        <Link to="/" exact>
          <Button className="m-2">ADD Details</Button>
        </Link>
      </div>

      <table className="table mt-3">
        <thead className="bg-secondary text-white">
          <tr>
          <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Checked</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>

        <tbody>
          {APIData.map((data) => (
            <tr key={data.id}>
               <td>{data.id}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.salary}</td>
              <td>{data.checkbox ? "Checked" : "Unchecked"}</td>
              <td>
                <Link  to={`/update/${data.id}`}>
                  <span className="me-3 hover" onClick={() => setAPIData(data)}>
                    <i className="far  fa-edit"></i>
                  </span>
                </Link>
                <span className=" hover">
                  <span  onClick={() => onDelete(data.id)}>
                    <i className="far text-danger fa-trash-alt"></i>
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
