/* eslint-disable */
/**
 * External Dependencies
 */
 import React, { Fragment ,useEffect,useState} from "react";
 import { connect } from "react-redux";
 import './style.css';
 import {Link} from 'react-router-dom';
 import { addToast as actionAddToast } from "../../actions";
 import api from "../../services/api";

 /**
  * Component
  */
 function Content(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function getUsers(){
        try{
            const response = await api.user.getAllUsers();
            setUsers(response.data.data);
            actionAddToast({ title: "Successful", content: response.data.msg, time: new Date(), duration: 6000 });
            
        }
        catch(error){
            actionAddToast({ title: "Failed", content: response.data.msg, time: new Date(), duration: 6000 });
        } 
      }
      getUsers();
    },[])

    return(
        <div className="container">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Registered Date</th>
                        <th>Plan Type</th>
                        <th>Plan Started</th>
                        <th>Plan Expired</th>
                        <th>Actions</th>    
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => 
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.user_type}</td>
                            <td>{user.reg_date}</td>
                            <td>{user.type}</td>
                            <td>{user.plan_started}</td>
                            <td>{user.plan_expire}</td>
                            <Link to={{
                                pathname: "/users/edit-user",
                                state: {user}
                                }} >
                                <button className="userListEdit">Edit</button>
                            </Link>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
 }
 
 export default connect(({ settings }) => ({
     settings,
 }),{addToast:actionAddToast})(Content);
 