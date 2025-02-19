import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardText,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import userContext from "../userContext";
import '../stylesheets/AddForm.css'
import OglApi from "../api";


const AddForm = ({ type, subType, identifier, fields }) => {
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    // if form is for staff, only allow access to admin
    if (type === 'staff') {
        if (user.staffType !== 'admin') {
            return <Navigate to='/' />
        }
    }
    // for teams or players, allow access to admin or staff
    else {
        if (!user.username) {
            return <Navigate to='/' />
        }
    }

    // subject being updated, loading, & form state
    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false)

    // get form state based on fields. default value false for checkbox
    useEffect(() => {
        const getFormState = () => {
            let data = {};
            for (let field in fields) {
                let key = fields[field].name;
                fields[field].type === 'checkbox' 
                ? data[key] = false
                : data[key] = '';
            }
            setFormData(formData => data);
            setIsLoading(isLoading => false);
        }
        getFormState();
    }, [])

    // handle form input change for select & text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    // handle form input change for checkbox
    const handleCheck = (e) => {
        const { name } = e.target;
        formData[name] ? setFormData(formData => ({ ...formData, [name]: false }))
            : setFormData(formData => ({ ...formData, [name]: true }))
    }

    // handle form submit. 
    // hasSubmit true & isSuccessful false used to display feedback to user on submission failure.
    // if submission is successful, navigates to page for newly added subject, or to staff list page if type = staff (no individual staff info page)
    // (api.add returns added subject's info object -> get parameter for info page from that object at identifier passed from props)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = user.token

        const data = {};
        // send null instead of '' -> won't violate nullable foreign key contraint for case of teams/captain
        for (let [key,val] of Object.entries(formData)){
            data[key] = val === '' ? null : val;
        }

        const success = await OglApi.add(type, subType, data, token)

        if (success) {
            let route = type === 'staff' 
            ? `/${type}` 
            : `/${type}/${success[identifier]}`

            navigate(route);
        }
        
        setHasSubmit(hasSubmit => true);
    }

    return (
        <Card className="AddForm">
            <CardHeader>
                <CardTitle> Add : {type} </CardTitle>
            </CardHeader>
            {isLoading && <CardText>Loading...</CardText>}
            {/* failed form submit - received error on attempt */}
            {hasSubmit && !isSuccessful &&
                <>
                    <CardText> Something went wrong... please check your inputs and try again</CardText>
                    <div className="AddForm-btn-options">
                        <Button outline
                            className="AddForm-btn"
                            onClick={() => setHasSubmit(false)}>
                            Try Again
                        </Button>
                        <Button outline
                            className="AddForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </>}
            {/* form prior to submission */}
            {!isLoading && !hasSubmit &&
                <Form onSubmit={handleSubmit}>
                    {fields.map(f => {
                        return (
                            <FormGroup key={f.name}>
                                <Label htmlFor={f.name}>
                                    {f.label}
                                </Label>
                                {/* text input */}
                                {f.type === 'text' &&
                                    <Input
                                        id={f.name}
                                        name={f.name}
                                        placeholder={f.label}
                                        type={f.type}
                                        value={formData[f.name]}
                                        required={f.optional ? false : true}
                                        onChange={handleChange}
                                    />}
                                {/* checkbox input */}
                                {f.type === 'checkbox' &&
                                    <FormGroup>
                                        <Input
                                            id={f.name}
                                            name={f.name}
                                            type={f.type}
                                            checked={formData[f.name]}
                                            onChange={handleCheck}
                                        />
                                    </FormGroup>}
                                {/* select input */}
                                {f.type === 'select' &&
                                    <Input
                                        id={f.name}
                                        name={f.name}
                                        type={f.type}
                                        value={formData[f.name]}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option></option>
                                        {f.valueOptions.map(o =>
                                            <option key={o}>{o}</option>)}
                                    </Input>}
                                {/* date input */}
                                {f.type === 'date' &&
                                    <Input
                                        id={f.name}
                                        name={f.name}
                                        placeholder={f.label}
                                        type={f.type}
                                        value={formData[f.name]}
                                        onChange={handleChange}
                                    />}
                            </FormGroup>
                        )
                    })}
                    <div className='AddForm-btn-options'>
                        <Button outline
                            className="AddForm-btn">
                            Save
                        </Button>
                        <Button outline
                            className="AddForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            }
        </Card>
    )
}

export default AddForm;