import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router';
import '../App.css';
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


export default function Create() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [salary, setSalary] = useState("");
 
  let history = useHistory();


  // sending data to db

const postData = (e) => {
  e.preventDefault();

  
  if(firstName===''){
    alert("**Please enter the firstName**");
  }else if (lastName===''){
    alert("**Please enter the lastName**");
  }
  else if (salary===''){
    alert("**Please enter salary amount**");
  }
 
  else if (checkbox===false){
    alert("**Click on the checkbox button**");
  }
  else if ((firstName === true || lastName ===true ||salary===''|| checkbox===true)){
    axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/`, {
      firstName,
      lastName,
      salary,
      checkbox
  }).then(() => {
       history.push('/read')
       dataAdd();
  })
  }
  }


//  alert msg for adding data

const dataAdd = () => 
{toast((`${firstName}  ${lastName} ${salary}is added`),{
  position :toast.POSITION.TOP_CENTER,
    type :toast.TYPE.SUCCESS,
    autoClose:6000
});}

  return (
    <div className="bgcolor container w-50 rounded-3">
      <Form className="container mt-5  p-5">
        <label className="fw-bold">First Name :</label>
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} className="w-75 form-control mt-3" />
        <label className="fw-bold">Last Name :</label>
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} className="w-75 form-control mt-3" />
        <label className="fw-bold">Salary :</label>
        <input type="phone" placeholder="Salary" onChange={(e) => setSalary(e.target.value)} className="w-75 form-control mt-3" />

        <input className="me-2 mt-3" type="checkbox"  onChange={(e) => setCheckbox(!checkbox)}/>
        <span>I agree to the Terms and Conditions</span>
        <Button onClick={postData}  type="submit" className=" d-block w-25 mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}
