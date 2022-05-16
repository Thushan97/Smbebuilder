/* eslint-disable */
/**
 * Internal Dependencies
 */
import AsyncComponent from "../../components/async-component";
import PageWrap from "../../components/page-wrap";
import PageTitle from "../../components/page-title";
import PageContent from "../../components/page-content";
import api from "../../services/api";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import React, { useState } from "react";
import { connect } from "react-redux";
import {
    Button,
    Col,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Row,
} from "reactstrap";
import { addToast as actionAddToast } from "../../actions";

function Template() {
    const [projets, setprojets] = useState([]);
    const [uiIpdated, setuiIpdated] = useState(false);
    const userType = sessionStorage.getItem("userType");

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            templateName: "",
            templateType: "",
        },
    });
    const onSubmit = async (data) => {
        console.log(data);
        if (templateName) {
            try {
                const res = await api.project.createTemplateProject({
                    name: data.templateName,
                    plan: data.templateType,
                });
                console.log(res);
                if (res.data.status) {
                    console.log("storage clear ", res.data.token);

                    localStorage.clear();
                    window.location.replace(
                        `${process.env.REACT_APP_API_HOST}/api/builder/app/${res.data.token}`
                    );
                } else {
                    console.log("Error");
                    //TODO:handle Errors
                }
            } catch (error) {
                console.log("Error");
                //TODO:handle Errors
            }
        }
    };

    return (
        <PageWrap>
            <PageTitle
                breadcrumbs={{
                    "/": "Home",
                    "/templates": {
                        title: "Apps",
                        sub: "apps",
                    },
                }}
            >
                <h1>Templates</h1>
                <br />
                {userType === "admin" && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={4} sm={12}>
                                <FormGroup>
                                    <Label for="TemplateName">
                                        Template Name
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="templateName"
                                        rules={{
                                            required:
                                                "Template Name is required",
                                        }}
                                        render={({
                                            field: { ref, ...fieldProps },
                                        }) => (
                                            <Input
                                                id="templateName"
                                                innerRef={ref}
                                                placeholder="Template Name"
                                                type="text"
                                                invalid={
                                                    errors.templateName !==
                                                    undefined
                                                }
                                                {...fieldProps}
                                            />
                                        )}
                                    />

                                    <FormFeedback>
                                        {errors.templateName
                                            ? errors.templateName.message
                                            : ""}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={4} sm={12}>
                                <FormGroup>
                                    <Label for="templateType">
                                        Template Type
                                    </Label>

                                    <Controller
                                        control={control}
                                        name="templateType"
                                        rules={{
                                            required:
                                                "Template Type is required",
                                        }}
                                        render={({
                                            field: { ref, ...fieldProps },
                                        }) => (
                                            <Input
                                                id="templateType"
                                                innerRef={ref}
                                                type="select"
                                                invalid={
                                                    errors.templateType !==
                                                    undefined
                                                }
                                                {...fieldProps}
                                            >
                                                <option hidden value="">
                                                    Select Template Type
                                                </option>
                                                <option value="pro">Pro</option>
                                                <option value="infinite">
                                                    Infinite
                                                </option>
                                            </Input>
                                        )}
                                    />
                                    <FormFeedback>
                                        {errors.templateType
                                            ? errors.templateType.message
                                            : ""}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button onClick={onSubmit} type="submit">
                            Create New
                        </Button>
                    </form>
                )}
            </PageTitle>
            <PageContent>
                <AsyncComponent component={() => import("./content")} />
            </PageContent>
        </PageWrap>
    );
}

export default connect(({ settings }) => ({
    settings,
}))(Template);
