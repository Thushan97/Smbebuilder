/* eslint-disable */
/**
 * External Dependencies
 */
 import React, { Fragment ,useEffect,useState} from "react";
 import { connect } from "react-redux";
//  import './style.css';
 import { useLocation } from 'react-router-dom';
 import { addToast as actionAddToast } from "../../../actions";
import api from "../../../services/api";
 import './style.css';
//  import api from "../../services/api";

 /**
  * Component
  */
 function Content(props) {
    let location = useLocation();
    const [role, setRole] = useState('');
    const [plan, setPlan] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            role,
            plan
        }
        try{
            const response = await api.user.editUser(location.state.user.id, data);
            actionAddToast({ title: "Successful", content: response.data.msg, time: new Date(), duration: 6000 });
            window.location.replace("/users");
        }
        catch(error){
            actionAddToast({ title: "Failed", content: response.data.msg, time: new Date(), duration: 6000 });
        }   
    }

    return(
        <div className="newUser">
            <form className="newUserForm" >

                <div className="newUserItem">
                    <label>Role</label>
                    <select className="newForestSelect" name="active" id="active" onChange={(e) => setRole(e.target.value)}>
                        <option value="none">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="pro">Pro</option>
                        <option value="infinite">Infinite</option>
                    </select>
                </div>

                <div className="newUserItem">
                    <label>Plan Type</label>
                    <select className="newForestSelect" name="active" id="active" onChange={(e) => setPlan(e.target.value)}>
                        <option value="none">Select Plan Type</option>
                        <option value="admin">Admin</option>
                        <option value="pro">Pro</option>
                        <option value="infinite">Infinite</option>
                    </select>
                </div>
                
  
                <button className="newUserButton" onClick={handleSubmit}>Update</button>             
            </form>
            
        </div>
        // <h1>Hi</h1>
    );
 }
 
 export default connect(({ settings }) => ({
     settings,
 }),{addToast:actionAddToast})(Content);
 