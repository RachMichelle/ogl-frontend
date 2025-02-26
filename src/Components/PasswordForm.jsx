import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
    CardText
} from "reactstrap";
import userContext from "../userContext";
import OglApi from "../api";
import '../stylesheets/PasswordForm.css'


const PasswordForm = () => {
    const INITIAL_STATE = {
        currentPassword: '',
        newPassword: '',
        confirmNew: ''
    }
    const { username } = useParams();
    const { user } = useContext(userContext)

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword } = formData;
        let success = await OglApi.updatePassword(username, currentPassword, newPassword, user.token);

        if (success) setIsSuccessful(isSuccessful => true);

        setFormData(formData => INITIAL_STATE);
        setHasSubmit(hasSubmit => true);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
            </CardHeader>
            <CardBody>
                {hasSubmit && !isSuccessful &&
                    <>
                        <CardText>Password was not successfully changed</CardText>
                        <Button outline
                            className="PasswordForm-btn"
                            onClick={() => setHasSubmit(false)}>
                            Try Again
                        </Button>
                        <Button outline
                            className="PasswordForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </>}
                {hasSubmit && isSuccessful &&
                    <>
                        <CardText>Password change successful!</CardText>
                        <Button outline
                            className="PasswordForm-btn"
                            onClick={() => navigate(-1)}>
                            Back To Edit Page
                        </Button>
                    </>
                }
                {!hasSubmit &&
                    <>
                        <Form className="PasswordForm"
                            onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="currentPassword">
                                    Current Password
                                </Label>
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="newPassword">
                                    New Password
                                </Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="New Password"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="ConfirmNewPassword">
                                    Confirm New Password
                                </Label>
                                <Input
                                    invalid={formData.confirmNew &&
                                        formData.newPassword !== formData.confirmNew}
                                    valid={formData.confirmNew &&
                                        formData.newPassword === formData.confirmNew}
                                    id="confirmNew"
                                    name="confirmNew"
                                    placeholder="Confirm New Password"
                                    type="password"
                                    value={formData.confirmNew}
                                    onChange={handleChange}
                                />
                                <FormFeedback>
                                    Passwords don't match!
                                </FormFeedback>
                            </FormGroup>
                            <div className='PasswordForm-btn-options'>
                                <Button outline
                                    className="PasswordForm-btn"
                                    disabled={formData.newPassword &&
                                        formData.newPassword === formData.confirmNew
                                        ? false
                                        : true
                                    }>
                                    Submit
                                </Button>
                                <Button outline
                                    className="PasswordForm-cancel-btn"
                                    onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </>}
            </CardBody>
        </Card>
    )
}

export default PasswordForm;