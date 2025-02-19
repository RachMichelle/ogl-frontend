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
    Button
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

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { username, password } = formData;
        const user = await OglApi.authenticateUser(username, password);
        if (!user) {
            setFormData(data => INITIAL_STATE);
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
                    <Input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <Button outline>Submit</Button>
            </Form>
        </Card>
    )
}

export default LoginForm;