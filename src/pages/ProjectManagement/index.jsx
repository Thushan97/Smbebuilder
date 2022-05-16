/* eslint-disable */

/**
 * Styles.
 */
 import './style.scss';
 
 /**
  * Internal Dependencies
  */
 import AsyncComponent from '../../components/async-component';
 import PageWrap from '../../components/page-wrap';
 import PageTitle from '../../components/page-title';
 import PageContent from '../../components/page-content';
 import api from '../../services/api';
 

 import React, { useState } from "react";
 import { connect } from "react-redux";
 import {
     Button
 } from "reactstrap";
 import {     addToast as actionAddToast} from "../../actions";
 
 function ProjectManagement() {
     const [projets, setprojets] = useState([])
     const [uiIpdated, setuiIpdated] = useState(false)
     const handleCreate =async () => {
 
         const projectName = window.prompt("Name of project")
         if(projectName){
             try {
                 
                 const res=await api.project.createProject({name:projectName})
                 
                 if(res.data.status){
                     
                     console.log("storage clear ", res.data.token);
             
                     localStorage.clear();
                     window.location.replace(`${process.env.REACT_APP_API_HOST}/api/builder/app/${res.data.token}`);
              
                     
                    
                 }else{
                     console.log("Error")
                     //TODO:handle Errors
                 }
             } catch (error) {
                 console.log("Error")
                 //TODO:handle Errors
             }
         }
     };
     
     return (
         <PageWrap>
             <PageTitle
                 breadcrumbs={ {
                     '/': 'Home',
                     '/project-management': {
                        title: 'Apps',
                        sub: 'apps',
                    },
                 } }
             >
                 <h1>Project Management</h1>
                 <br />
                 <Button onClick={handleCreate} >Create New</Button>
             </PageTitle>
             <PageContent>
                 <AsyncComponent component={ () => import( './content' ) } />
             </PageContent>
         </PageWrap>
     );
 }
 
 export default connect(({ settings }) => ({
     settings,
 }))(ProjectManagement);

 