/* eslint-disable */
/**
 * External Dependencies
 */
 import React, { Fragment } from "react";
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
 
 import api from "../../services/api";
 import { useEffect, useState } from 'react';
 
 /**
  * Component
  */
 function Content(props) {
     const [templates, setTemplates] = useState('');

    useEffect(() => {
        async function getTemplates(){
            const result = await api.template.getTemplates();
            setTemplates(result.data);
            // console.log(result);
        }
        getTemplates();
        
    }, [templates]);
    
     const onClick = async () => {
         const res = await api.project.openProject();
         window.open(res.data, "_self");
     };
 
     return (
         <Fragment>
             <Row className="xs-gap">
                 {templates && templates.map((template) => (
                     <Col sm key={template.id}>
                        <Card>
                            <CardImg
                                alt=""
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADICAYAAACZBDirAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKNSURBVHgB7dQBEQAQAAAx9O/nnDAE+S3E5j73DYCgNQCiBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBrA+NWgUa6x769AAAAABJRU5ErkJggg=="
                                top
                            />
                            <CardBody>
                                <CardTitle className="h2">{template.name}</CardTitle>
                                <Button onClick={onClick} color="brand">
                                    Open
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                 ))}
                
                 {/* <Col sm>
                     <Card>
                         <CardImg
                             alt=""
                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADICAYAAACZBDirAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKNSURBVHgB7dQBEQAQAAAx9O/nnDAE+S3E5j73DYCgNQCiBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBLAECWQIEsgQIZAkQyBIgkCVAIEuAQJYAgSwBAlkCBLIECGQJEMgSIJAlQCBLgECWAIEsAQJZAgSyBAhkCRDIEiCQJUAgS4BAlgCBrA+NWgUa6x769AAAAABJRU5ErkJggg=="
                             top
                         />
                         <CardBody>
                             <CardTitle className="h2">Project 3</CardTitle>
                             <Button onClick={onClick} color="brand">
                                 Open
                             </Button>
                         </CardBody>
                     </Card>
                 </Col> */}
             </Row>
         </Fragment>
     );
 }
 
 export default connect(({ settings }) => ({
     settings,
 }))(Content);
 