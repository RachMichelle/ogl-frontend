import React, { useContext, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardSubtitle, CardText, CardTitle } from "reactstrap";
import userContext from "../userContext";
import OglApi from "../api";
import '../stylesheets/Delete.css';


const Delete = ({ type }) => {
    const { user } = useContext(userContext);
    const params = useParams();
    const paramName = Object.keys(params)[0];
    const paramValue = params[paramName];
    const navigate = useNavigate();

    const [hasConfirmed, setHasConfirmed] = useState(false)

    // access for admin only
    if (user.staffType !== 'admin') return <Navigate to={`/${type}`} />;

    // for confirm delete => yes 
    const handleDelete = async () => {
        const success = await OglApi.delete(type, paramValue, user.token);
        if (success) navigate(`/${type}`);

        setHasConfirmed(hasConfirmed => true);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Confirm Delete</CardTitle>
            </CardHeader>
            {!hasConfirmed &&
                <>
                    <CardSubtitle className="Delete-subtitle">
                        Are you sure you want to delete {paramValue}?
                    </CardSubtitle>
                    <div className="Delete-btns">
                        <Button outline
                            className="Delete-btn-confirm"
                            onClick={handleDelete}>
                            Yes
                        </Button>
                        <Button outline
                            className="Delete-btn-cancel"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </>}
            {/* only case hasConfirmed would be true without navigating away from this route would be failed delete attempt */}
            {hasConfirmed &&
                <>
                    <CardText className="Delete-text">
                        Unable to delete {paramValue}
                    </CardText>
                    <div className="Delete-btns">
                        <Button outline
                            className="Delete-btn-cancel"
                            onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    </div>
                </>}
        </Card>
    );
};

export default Delete;