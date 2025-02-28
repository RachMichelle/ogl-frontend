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
    CardText,
    InputGroup
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
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

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

    // toggle show/hide password, arguements for state and function to change state.
    const toggleShowPwd = (e, state, setState) => {
        e.preventDefault();
        setState(!state);
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
                {/* form submit but change not successful */}
                {hasSubmit && !isSuccessful &&
                    <>
                        <CardText>Password was not successfully changed. Please make sure current password was entered correctly.</CardText>
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

                {/* form submit and change is successful */}
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

                {/* form prior to submission */}
                {!hasSubmit &&
                    <>
                        <Form className="PasswordForm"
                            onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="currentPassword">
                                    Current Password
                                </Label>
                                <InputGroup>
                                    <Input
                                        id="currentPassword"
                                        name="currentPassword"
                                        placeholder="Current Password"
                                        type={!showCurrentPwd ? "password" : "text"}
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                    />
                                    <Button outline
                                        className="PasswordForm-pwd-btn"
                                        onClick={(e) =>
                                            toggleShowPwd(e, showCurrentPwd, setShowCurrentPwd)}
                                    >
                                        {!showCurrentPwd ? 'Show' : 'Hide'}
                                    </Button>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="newPassword">
                                    New Password
                                </Label>
                                <InputGroup>
                                    <Input
                                        invalid={formData.currentPassword && formData.newPassword === formData.currentPassword}
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="New Password"
                                        type={!showNewPwd ? "password" : "text"}
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                    <Button outline
                                        className="PasswordForm-pwd-btn"
                                        onClick={(e) =>
                                            toggleShowPwd(e, showNewPwd, setShowNewPwd)}
                                    >
                                        {!showNewPwd ? 'Show' : 'Hide'}
                                    </Button>
                                    <FormFeedback>
                                        New password can't be the same as your current password!
                                    </FormFeedback>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="ConfirmNewPassword">
                                    Confirm New Password
                                </Label>
                                <InputGroup>
                                    <Input
                                        invalid={formData.confirmNew &&
                                            formData.newPassword !== formData.confirmNew}
                                        valid={formData.confirmNew &&
                                            formData.newPassword === formData.confirmNew}
                                        id="confirmNew"
                                        name="confirmNew"
                                        placeholder="Confirm New Password"
                                        type={!showConfirmPwd ? "password" : "text"}
                                        value={formData.confirmNew}
                                        onChange={handleChange}
                                    />
                                    <Button outline
                                        className="PasswordForm-pwd-btn"
                                        onClick={(e) =>
                                            toggleShowPwd(e, showConfirmPwd, setShowConfirmPwd)}
                                    >
                                        {!showConfirmPwd ? 'Show' : 'Hide'}
                                    </Button>
                                    <FormFeedback>
                                        Passwords don't match!
                                    </FormFeedback>
                                </InputGroup>
                            </FormGroup>

                            <div className='PasswordForm-btn-options'>
                                {/* button remains disabled unless a new password is entered, current&new passwords don't match, and new&confirmed passwords match*/}
                                <Button outline
                                    className="PasswordForm-btn"
                                    disabled={formData.newPassword &&
                                        formData.newPassword === formData.confirmNew &&
                                        formData.newPassword !== formData.currentPassword
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