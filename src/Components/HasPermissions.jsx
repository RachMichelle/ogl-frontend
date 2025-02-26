import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import userContext from "../userContext";

const HasPermissions = ({ children, targetPermissions, redirect }) => {
    const params = useParams();
    const paramName = Object.keys(params)[0];
    const paramValue = params[paramName];

    const { user } = useContext(userContext);

    let userType;

    // check for same user
    if (user.username === paramValue) {
        userType = 'same';
    }
    // check for admin
    else if (user.staffType === 'admin') {
        userType = 'admin';
    }
    // check for mod
    else if (user.staffType === 'mod') {
        userType = 'mod';
    }
    // no permissions
    else {
        userType = null;
    }

    const checkPermissions = () => {
        if (userType === null) return false;
        const match = targetPermissions.filter(target => target === userType);
        if (match.length) return true;
        return false;
    };

    if (!checkPermissions()) return <Navigate to={redirect} />

    return children;

}

export default HasPermissions;