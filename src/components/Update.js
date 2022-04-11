import React, { useState,useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useHistory ,useParams} from 'react-router';
import '../App.css';
import { Link } from "react-router-dom";
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function Update() {


  const intialValues = {
    firstName:'',
    lastName:'',
    salary:'',
    checkbox:false
  }
 


    const [users ,setUsers] = useState(intialValues);
    const {firstName,lastName,salary,checkbox}=users
    const {id}=useParams()

    let history = useHistory();
  
    useEffect(() => {
      editValues();
    }, []);

    
      const editValues = () => {
        axios
          .get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
          .then((res) => {
            setUsers(res.data);
          });
      };


    const handlerChnage =(e)=> {
        setUsers({...users,[e.target.name]:[e.target.value]})

    }
// update data

const updateAPIData = () => {

  if(firstName ===""){
    alert('**firstName is missing**')
  }else if(lastName===""){
    alert('**lastName is missing**')
  }else if(salary===""){
    alert('**salary is missing**')
  }
else {
    axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
      firstName,
       lastName,
       salary,
       checkbox
       
  }).then(() => {
      updateMessage();
      history.push('/read')
  })
  }}
    
// update toast messages 
const updateMessage = () => {
  if (firstName!==firstName.value)
  toast((`${firstName}  ${lastName} ${salary} is updated`),{
  position :toast.POSITION.TOP_RIGHT,
    type :toast.TYPE.SUCCESS,
    autoClose:6000
});}


   
    return (
        <div  className="bgcolor container w-50 rounded-3">
           <Form  className="container mt-5  p-5">
        <label className="fw-bold">First Name</label>
        <input type="text" placeholder="First Name" name="firstName" value={firstName}   onChange={(e) =>handlerChnage(e)} className="w-50 form-control mt-3" />
        <label className="fw-bold">Last Name</label>
        <input type="text" placeholder="Last Name" name="lastName" value={lastName}    onChange={(e) =>handlerChnage(e)} className="w-50 form-control mt-3" />
        <label className="fw-bold">Salary :</label>
        <input type="phone" placeholder="Salary" name="salary" value={salary}   onChange={(e) =>handlerChnage(e)} className="w-75 form-control mt-3" />

        <input type="checkbox" checked="checked" name="checkbox" value={checkbox}  onChange={(e) =>handlerChnage(e)}/>{" "}
        <span>I agree to the Terms and Conditions</span>
        <Button onClick={()=>updateAPIData()} className=" d-block w-25 mt-3">
          update
        </Button>
        <Link to="/read" className="text-decoration-none">
          <div  className=" text-dark text-end"><i class="fas fa-arrow-left pe-2"></i> <code className="fs-4">Back</code></div></Link>
      </Form>
        </div>
    )
}