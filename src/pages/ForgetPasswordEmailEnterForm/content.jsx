/* eslint-disable */

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames/dedupe";
import SweetAlert from "sweetalert2-react";

import { Spinner } from "reactstrap";

import { isValidEmail } from "../../utils";
import { addToast as actionAddToast } from "../../actions";

import api from "../../services/api";

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailError: "",
            loading: false,
            disable: false,
            showSuccess: false,
            sweetAlertMsg: "",
        };

        this.checkEmail = this.checkEmail.bind(this);
        this.maybeLogin = this.maybeLogin.bind(this);
    }

    checkEmail() {
        const { email } = this.state;

        const isValid = email && isValidEmail(email);

        this.setState({
            emailError: isValid ? "" : "Invalid email format",
        });

        return isValid;
    }

    async maybeLogin() {
        const { addToast } = this.props;

        if (this.state.loading || this.state.disable) {
            return;
        }

        let isValid = true;
        isValid = this.checkEmail() && isValid;

        // Form is not valid.
        if (!isValid) {
            return;
        }

        this.setState({ loading: true });
        api.auth
            .forgotPassword({ email: this.state.email })
            .then((res) => {
                this.setState({ loading: false });
                if (!res.data.status) {
                    addToast({
                        title: "Error",
                        content: res.data.msg,
                        time: new Date(),
                        duration: 6000,
                        color: "danger",
                    });
                    return;
                } else {
                    this.setState({
                        disable: true,
                        showSuccess: true,
                        sweetAlertMsg: res.data.msg,
                    });
                }
            })
            .catch((err) => {
                this.setState({ loading: false });
                return;
            });
    }

    render() {
        const { email, emailError, sweetAlertMsg } = this.state;
        return (
            <Fragment>
                <div className="form rui-sign-form rui-sign-form-cloud">
                    <div className="row vertical-gap sm-gap justify-content-center">
                        <div className="col-12">
                            <h1 className="display-4 mb-10 text-center">
                                Enter Your Email
                            </h1>
                        </div>
                        <div className="col-12">
                            <input
                                type="email"
                                className={classnames("form-control", {
                                    "is-invalid": emailError,
                                })}
                                aria-describedby="emailHelp"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    this.setState(
                                        {
                                            email: e.target.value,
                                        },
                                        emailError ? this.checkEmail : () => {}
                                    );
                                }}
                                onBlur={this.checkEmail}
                                disabled={
                                    this.state.loading || this.state.disable
                                }
                            />
                            {emailError ? (
                                <div className="invalid-feedback">
                                    {emailError}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-brand btn-block text-center"
                                onClick={this.maybeLogin}
                                disabled={
                                    this.state.loading || this.state.disable
                                }
                            >
                                Send
                                {this.state.loading ? <Spinner /> : ""}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-grey-5">
                    Do you remember your password?{" "}
                    <Link to="/sign-in" className="text-2">
                        Sign In
                    </Link>
                </div>
                <SweetAlert
                    type="success"
                    show={this.state.showSuccess}
                    title="Success"
                    html={sweetAlertMsg}
                    confirmButtonColor="#725ec3"
                    onConfirm={() => this.setState({ showSuccess: false })}
                    onCancel={() => this.setState({ showSuccess: false })}
                    onEscapeKey={() => this.setState({ showSuccess: false })}
                />
            </Fragment>
        );
    }
}

export default connect(
    ({ auth, settings }) => ({
        auth,
        settings,
    }),
    { addToast: actionAddToast }
)(Content);
