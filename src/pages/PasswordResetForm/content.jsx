/* eslint-disable */
/**
 * External Dependencies
 */
import React, { Component, Fragment } from "react";
import classnames from "classnames/dedupe";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import SweetAlert from "sweetalert2-react";
import queryString from "query-string";

/**
 * Internal Dependencies
 */
import Icon from "../../components/icon";
import { isValidEmail } from "../../utils";

import { updateAuth as actionUpdateAuth } from "../../actions";
import { addToast as actionAddToast } from "../../actions";

import api from "../../services/api";
import settings from "./../Typography/content";

/**
 * Component
 */
class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordAgain: "",
            passwordError: "",
            passwordAgainError: "",
            loading: false,
            disabled: false,
            showSuccess: false,
            sweetAlertMsg: "",
            ...queryString.parse(
                window.location.hash.replace(/^#/g, "").split("?")[1]
            ),
        };
        this.checkPassword = this.checkPassword.bind(this);
        this.maybeLogin = this.maybeLogin.bind(this);
    }

    checkPassword() {
        const { password, passwordAgain } = this.state;

        if (password && password.length < 6) {
            this.setState({
                passwordError: "Password must be at least 6 characters long",
                passwordAgainError: "",
            });
            return false;
        } else if (passwordAgain && passwordAgain.length < 6) {
            this.setState({
                passwordError: "",
                passwordAgainError:
                    "Password must be at least 6 characters long",
            });
            return false;
        } else if (password !== passwordAgain) {
            this.setState({
                passwordError: "",
                passwordAgainError: "Both entered password should be same.",
            });
            return false;
        } else {
            this.setState({ passwordError: "", passwordAgainError: "" });
            return true;
        }
    }

    async maybeLogin() {
        const { updateAuth, addToast } = this.props;

        if (this.state.loading || this.state.disabled) {
            return;
        }

        let isValid = true;
        isValid = this.checkPassword() && isValid;

        // Form is not valid.
        if (!isValid) {
            return;
        }

        this.setState({ loading: true });
        api.auth
            .resetPassword({
                userId: this.state.userId,
                email: this.state.email,
                token: this.state.token,
                password: this.state.password,
            })
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
        const {
            password,
            passwordAgain,
            passwordError,
            passwordAgainError,
            sweetAlertMsg,
        } = this.state;

        return (
            <Fragment>
                <div className="bg-image">
                    <div className="bg-grey-1" />
                </div>
                <div className="form rui-sign-form rui-sign-form-cloud">
                    <div className="row vertical-gap sm-gap justify-content-center">
                        <div className="col-12">
                            <h1 className="display-4 mb-10 text-center">
                                Reset Your Password
                            </h1>
                        </div>
                        <div className="col-12">
                            <input
                                type="password"
                                className={classnames("form-control", {
                                    "is-invalid": passwordError,
                                })}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    this.setState(
                                        {
                                            password: e.target.value,
                                        },
                                        passwordError
                                            ? this.checkPassword
                                            : () => {}
                                    );
                                }}
                                onBlur={this.checkPassword}
                                disabled={this.state.loading}
                            />
                            {passwordError ? (
                                <div className="invalid-feedback">
                                    {passwordError}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-12">
                            <input
                                type="password"
                                className={classnames("form-control", {
                                    "is-invalid": passwordAgainError,
                                })}
                                placeholder="Password Again"
                                value={passwordAgain}
                                onChange={(e) => {
                                    this.setState(
                                        {
                                            passwordAgain: e.target.value,
                                        },
                                        passwordError
                                            ? this.checkPassword
                                            : () => {}
                                    );
                                }}
                                onBlur={this.checkPassword}
                                disabled={this.state.loading}
                            />
                            {passwordAgainError ? (
                                <div className="invalid-feedback">
                                    {passwordAgainError}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="col-12">
                            <button
                                className="btn btn-brand btn-block text-center"
                                onClick={this.maybeLogin}
                                disabled={this.state.loading}
                            >
                                Submit
                                {this.state.loading ? <Spinner /> : ""}
                            </button>
                        </div>
                    </div>
                </div>
                <SweetAlert
                    type="success"
                    show={this.state.showSuccess}
                    title="Success"
                    html={sweetAlertMsg}
                    confirmButtonColor="#725ec3"
                    onConfirm={() => {
                        this.setState({ showSuccess: false });
                        window.open("/sign-in", "_self");
                    }}
                    onCancel={() => this.setState({ showSuccess: false })}
                    onEscapeKey={() => this.setState({ showSuccess: false })}
                />
            </Fragment>
        );
    }
}

export default connect(
    (auth, settings) => ({
        auth,
        settings,
    }),
    { updateAuth: actionUpdateAuth, addToast: actionAddToast }
)(Content);
