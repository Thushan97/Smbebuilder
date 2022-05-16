/* eslint-disable */
/**
 * External Dependencies
 */
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/**
 * Internal Dependencies
 */
import RoutesList from "./pages";
import NotFoundPage from "./pages/404";

/**
 * Component
 */

function authorization(path) {
    const userType = sessionStorage.getItem("userType");
    if (path === "/") {
        return true;
    }
    if (path === "/sign-in") {
        return true;
    }
    if (path === "/sign-up") {
        return true;
    }
    if (path === "/forget-password-email-form") {
        return true;
    }
    if (path === "/password-reset-form") {
        return true;
    }
    if (path === "/plans") {
        if (
            userType === "free" ||
            userType === "admin" ||
            userType === "pro" ||
            userType === "infinite"
        ) {
            return true;
        }
    }
    if (path === "/project-management") {
        if (
            userType === "admin" ||
            userType === "pro" ||
            userType === "infinite"
        ) {
            return true;
        }
    }
    if (path === "/users") {
        if (userType === "admin") {
            return true;
        }
    }
    if (path === "/templates") {
        if (
            userType === "admin" ||
            userType === "pro" ||
            userType === "infinite"
        ) {
            return true;
        }
    }
    if (path === "/users/edit-user") {
        if (userType === "admin") {
            return true;
        }
    }
    return false;
}

class Routes extends Component {
    render() {
        const { location } = this.props;

        return (
            <Switch location={location}>
                {Object.keys(RoutesList).map((path) => {
                    const RouteInner = RoutesList[path];
                    return (
                        <Route
                            key={path}
                            path={path}
                            exact
                            render={() => {
                                if (authorization(path)) {
                                    return <RouteInner />;
                                } else {
                                    return <NotFoundPage />;
                                }
                            }}
                        />
                    );
                })}

                {/* 404 */}
                <Route render={() => <NotFoundPage />} />
            </Switch>
        );
    }
}

export default Routes;
