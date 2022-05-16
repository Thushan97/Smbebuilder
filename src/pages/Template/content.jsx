/* eslint-disable */
/**
 * External Dependencies
 */
import React, { Fragment, useEffect, useState } from "react";
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
import { addToast as actionAddToast } from "../../actions";

import api from "../../services/api";

/**
 * Component
 */
function Content(props) {
    const [templates, setTemplates] = useState([]);
    const [uiIpdated, setuiIpdated] = useState(false);
    const userType = sessionStorage.getItem("userType");

    const onClick = async (id) => {
        const userId = sessionStorage.getItem("userId");
        try {
            const res = await api.builder.getTemplateAccessToken(id, userId);
            console.log(res);
            if (res.data.status) {
                localStorage.clear();

                window.location.replace(
                    `${process.env.REACT_APP_API_HOST}/api/builder/app/${res.data.token}`
                );
            } else {
                //TODO:handle Errors
                console.log(res);
            }
        } catch (error) {
            //TODO: handle Errors
        }
    };

    const onEditClick = async (id) => {
        const templatename = window.prompt("Change the template name?");
        try {
            if (templatename) {
                const res = await api.project.updateTemplate(id, {
                    name: templatename,
                });
                if (res.data.status) {
                    setuiIpdated(true);
                } else {
                    //TODO: handle Errors
                    console.log(res.data.msg);
                }
            }
        } catch (error) {
            //TODO: handle Errors
        }
    };
    const onDeleteClick = async (id) => {
        const conf = window.confirm("Do you want to delete?");
        try {
            if (conf) {
                const res = await api.project.deleteTemplate(id);
                if (res.data.status) {
                    setuiIpdated(true);
                } else {
                    //TODO: handle Errors
                    console.log(res.data.msg);
                }
            }
        } catch (error) {
            //TODO: handle Errors
        }
    };

    useEffect(() => {
        async function getTemplates() {
            const result = await api.project.getAllTemplateProjects();
            setTemplates(result.data.data);
            console.log(result.data.data);
        }
        getTemplates();
    }, [uiIpdated]);

    return (
        <Fragment>
            <Row className="xs-gap">
                {templates &&
                    templates.map((template, index) => {
                        return (
                            <Col sm key={index}>
                                <Card>
                                    <CardImg
                                        alt=""
                                        src="https://5.imimg.com/data5/CP/LR/MY-24935179/school-project-file-500x500.jpg"
                                        top
                                    />
                                    <CardBody>
                                        <CardTitle className="h2">
                                            {template.name}
                                        </CardTitle>
                                        <div style={{ padding: "5px" }}>
                                            <Button
                                                onClick={() =>
                                                    onClick(template.id)
                                                }
                                                color="brand"
                                            >
                                                Open
                                            </Button>
                                        </div>
                                        {userType === "admin" && (
                                            <div style={{ padding: "5px" }}>
                                                <Button
                                                    onClick={() =>
                                                        onEditClick(template.id)
                                                    }
                                                    color="primary"
                                                >
                                                    Rename
                                                </Button>
                                            </div>
                                        )}

                                        {userType === "admin" && (
                                            <div style={{ padding: "5px" }}>
                                                <Button
                                                    onClick={() =>
                                                        onDeleteClick(
                                                            template.id
                                                        )
                                                    }
                                                    color="danger"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
            </Row>
        </Fragment>
    );
}

export default connect(
    ({ settings }) => ({
        settings,
    }),
    { addToast: actionAddToast }
)(Content);
