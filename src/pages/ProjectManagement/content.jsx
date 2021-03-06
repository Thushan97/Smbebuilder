/* eslint-disable */
/**
 * External Dependencies
 */
 import React, { Fragment ,useEffect,useState} from "react";
 import { connect } from "react-redux";
 import {
     Card,
     CardImg,
     CardBody,
     CardTitle,
     Button,
     Row,
     Col,
 } from "reactstrap";
 import {     addToast as actionAddToast} from "../../actions";
 
 import api from "../../services/api";
 
 /**
  * Component
  */
 function Content(props) {
 
     const [projets, setprojets] = useState([])
     const [uiIpdated, setuiIpdated] = useState(false)
 
 
    
     const onClick = async (id) => {
        console.log(`id`, id);
         try {
             
             const res = await api.builder.getFileAccessToken(id);
             console.log(res)
             if(res.data.status){
                 localStorage.clear();
                 
                 window.location.replace(`${process.env.REACT_APP_API_HOST}/api/builder/app/${res.data.token}`)
             }else{
                 //TODO:handle Errors
                 console.log(res)
             }
         } catch (error) {
             //TODO: handle Errors
         }
 
     };
 
     const onEditClick = async(id) => {
         const projectname = window.prompt("Change the project name?")
         try {
             if(projectname){
 
                 const res = await api.project.updateProject(id,{name:projectname})
                 if(res.data.status){
                     setuiIpdated(true)
                 }else{
                     //TODO: handle Errors
                 console.log(res.data.msg)
 
                 }
             }
         } catch (error) {
             //TODO: handle Errors
             
         }
     }
     const onDeleteClick = async(id) => {
         const conf = window.confirm("Do you want to delete?")
         try {
             if(conf){
 
                 const res = await api.project.deleteProject(id)
                 if(res.data.status){
                     setuiIpdated(true)
                 }else{
                     //TODO: handle Errors
                 console.log(res.data.msg)
 
                 }
             }
         } catch (error) {
             //TODO: handle Errors
             
         }
     }
     
 
     useEffect(() => {
         async function getProjects() {
             setuiIpdated(false)
             try {
                 
                 const res  =await api.project.getAllProjects()
                if(res.data.status){
                    setprojets(res.data.data)
                    
                 }
                 
             } catch (error) {
                 //TODO:handle errors
                 actionAddToast({ title: "Successful", content: res.data.msg, time: new Date(), duration: 6000 });
                 
             }
         }
         getProjects()
 
     }, [uiIpdated])
 
     return (
         <Fragment>
             <Row className="xs-gap">
                 {projets && projets.map((project,index)=>{
                     return <Col sm key={index}>
                     <Card>
                         <CardImg
                             alt=""
                             src="https://5.imimg.com/data5/CP/LR/MY-24935179/school-project-file-500x500.jpg"
                             top
                         />
                         <CardBody>
                             <CardTitle className="h2">{project.name}</CardTitle>
                             <div style={{padding:"5px"}}>
 
                             <Button  onClick={()=>onClick(project.id)} color="brand">
                                 Open
                             </Button>
                             </div>
                             <div style={{padding:"5px"}}>
                             <Button onClick={()=>onEditClick(project.id)} color="primary">
                                 Rename
                             </Button>
                             </div>
                             <div style={{padding:"5px"}}>
 
                             <Button onClick={()=>onDeleteClick(project.id)} color="danger">
                                 Delete
                             </Button>
                             </div>
                         </CardBody>
                     </Card>
                 </Col>
                 })}
             </Row>
         </Fragment>
     );
 }
 
 export default connect(({ settings }) => ({
     settings,
 }),{addToast:actionAddToast})(Content);
 