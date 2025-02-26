import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
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
import OglApi from "../api";
import '../stylesheets/EditForm.css'

const EditForm = ({ type, subType, fields }) => {
    const params = useParams();
    const paramName = Object.keys(params)[0];
    const paramValue = params[paramName];

    const { user } = useContext(userContext);
    const navigate = useNavigate();

    // subject being updated, loading, & form state
    const [toUpdate, setToUpdate] = useState(null);
    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    // get info for subject being updated on mount
    // if no subject found, navigate to type list
    useEffect(() => {
        const getSubject = async () => {
            let subject = await OglApi.getOne(type, subType, paramValue);
            if (subject === undefined) return <Navigate to={`/${type}`} />

            setToUpdate(toUpdate => subject);
        }
        getSubject();
    }, [])

    // get form state based on fields and subject data. 
    // triggered by toUpdate change
    // once complete, set isLoading to false to display form
    useEffect(() => {
        const getFormState = () => {
            let data = {};
            for (let field in fields) {
                let key = fields[field].name;
                let val = toUpdate !== null ? toUpdate[key] : '';
                data[key] = val;
            }
            setFormData(formData => data);
            setIsLoading(isLoading => toUpdate === null ? true : false);
        }
        getFormState();
    }, [toUpdate])

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

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = formData;
        const token = user.token

        const success = await OglApi.update(type, subType, paramValue, data, token)

        if (!success) {
            setHasSubmit(hasSubmit => true);
        } else {
            setIsSuccessful(isSuccessful => true);
            setHasSubmit(hasSubmit => true);
        }
    }

    return (
        <Card className="EditForm">
            {/* delete button for admin view only */}
            {user.staffType === 'admin' &&
                <Link to={`/${type}/delete/${paramValue}`}
                    className="EditForm-delete-btn">
                    <Button outline>
                        &#128465;
                    </Button>
                </Link>}
            <CardHeader>
                <CardTitle> Edit : {paramValue} </CardTitle>
            </CardHeader>
            {/* only render username for logged in user matches param value -> 
            will only apply to staff */}
            {user.username === paramValue &&
                <Link to={`/staff/password/${paramValue}`}
                    className="EditForm-password-btn">
                    <Button outline>Update Password</Button>
                </Link>}
            {isLoading && <CardText>Loading...</CardText>}
            {/* failed form submit -> error on attempt */}
            {hasSubmit && !isSuccessful &&
                <>
                    <CardText> Something went wrong... please check your inputs and try again</CardText>
                    <div className="EditForm-btn-options">
                        <Button outline
                            className="EditForm-btn"
                            onClick={() => setHasSubmit(false)}>
                            Try Again
                        </Button>
                        <Button outline
                            className="EditForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </>
            }
            {/* successful form submission */}
            {hasSubmit && isSuccessful &&
                <>
                    <CardText>Update successful!</CardText>
                    <Button outline
                        block
                        className="EditForm-btn"
                        onClick={() => navigate(`/${type}/${paramValue}`)}>
                        Go to {subType} info
                    </Button>
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
                                    >
                                        {f.valueOptions.map(o =>
                                            <option key={o}>{o}</option>)}
                                    </Input>}
                            </FormGroup>
                        )
                    })}
                    <div className='EditForm-btn-options'>
                        <Button outline
                            className="EditForm-btn">
                            Save
                        </Button>
                        <Button outline
                            className="EditForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            }
        </Card>
    )
}

export default EditForm;