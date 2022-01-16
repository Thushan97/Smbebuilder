/* eslint-disable */

/**
 * Styles.
 */
import './style.scss';

/**
 * External Dependencies
 */
//  import React, { Component, Fragment ,useEffect,useState} from "react";

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';
// import {
   
//     Button,
    
// } from "reactstrap";
import api from '../../services/api';


import React, { Component, Fragment ,useEffect,useState} from "react";
import { connect } from "react-redux";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Row,
    Col,
} from "reactstrap";
import {     addToast as actionAddToast} from "../../actions";

// import api from "../../services/api";
// import {
//     Card,
//     CardImg,
//     CardBody,
//     CardTitle,
//     CardText,
//     Button,
//     Row,
//     Col,
// } from "reactstrap";
// import {     addToast as actionAddToast} from "../../actions";

/**
 * Component
 */

function Dashboard() {
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
                } }
            >
                <h1>Dashboard</h1>
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
}))(Dashboard);
// export default Dashboard;
