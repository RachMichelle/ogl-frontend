// staff login form
// on submission -> if credentials confirmed valid, saves user objeect to userContext and navigates back to homepage
// if credentials invalid, reloads blank login form

import React, { useState, useContext } from "react";
import {
    Card,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    CardText,
    InputGroup
} from "reactstrap";
import '../stylesheets/LoginForm.css'
import OglApi from "../api";
import userContext from "../userContext";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const { addUser } = useContext(userContext)

    const navigate = useNavigate();

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    const toggleShowPwd = (e) => {
        e.preventDefault();
        setShowPassword(showPassword => !showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { username, password } = formData;
        const user = await OglApi.authenticateUser(username, password);
        if (!user) {
            setFormData(data => INITIAL_STATE);
            setHasAttempted(hasAttempted => true);
        } else {
            addUser(user);
            navigate('/');
        }
    }

    return (
        <Card className="LoginForm">
            <CardTitle>
                Log In
            </CardTitle>
            {/* Feedback for failed login attempt. Successful attempt nagivates to homepage, so this will only show if login fails and formm resets*/}
            {hasAttempted &&
                <CardText className="LoginForm-feedback">
                    Incorrect username/password
                </CardText>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username"
                        className="LoginForm-label">
                        Username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password"
                        className="LoginForm-label">
                        Password
                    </Label>
                    <InputGroup>
                        <Input
                            id="password"
                            name="password"
                            placeholder="password"
                            type={!showPassword ? "password" : "text"}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button  outline 
                        className="LoginForm-pwd-btn"
                        onClick={toggleShowPwd}
                        >
                            {!showPassword ? 'Show' : 'Hide'}
                        </Button>
                    </InputGroup>
                </FormGroup>
                <Button outline>Submit</Button>
            </Form>
        </Card>
    )
}

export default LoginForm;