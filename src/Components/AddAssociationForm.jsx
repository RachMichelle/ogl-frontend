import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardText,
    Form,
    FormGroup,
    Input,
    FormText,
    Button
} from "reactstrap";
import userContext from "../userContext";
import OglApi from "../api";
import '../stylesheets/AddAssociationForm.css'

const AddAssociationForm = () => {
    const { user } = useContext(userContext)
    const { alias } = useParams();

    const navigate = useNavigate();

    // only accessable to staff
    if (!user.username) return <Navigate to={`/players/${alias}`} />

    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({ team: '' });
    const [hasSubmit, setHasSubmit] = useState(false)

    // get list of teams for select options on mount
    useEffect(() => {
        const getTeams = async () => {
            let teamList = await OglApi.getAll('teams');
            setTeams(teamList);
        }
        getTeams();
    }, []);

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = formData.team;

        let success = await OglApi.addTeamAssociation(alias, code, user.token)

        if (success) navigate(`/players/${alias}`);

        setHasSubmit(hasSubmit => true);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add team for {alias}</CardTitle>
            </CardHeader>
            {!teams.length && <p>Loading...</p>}
            {/* only case hasSubmit would be true without navigating away from this route would be failed add attempt */}
            {hasSubmit &&
                <>
                    <CardText className="AddAssociationForm-text">
                        Unable to add team. Please check if player is already associated.
                    </CardText>
                    <div className="AddAssociationForm-btn-options">
                        <Button outline
                            className="AddAssociationForm-btn"
                            onClick={() => setHasSubmit(false)}>
                            Try Again
                        </Button>
                        <Button outline
                            className="AddAssociationForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    </div>
                </>
            }
            {teams.length && !hasSubmit &&
                <Form onSubmit={handleSubmit}
                    className="AddAssociationForm">
                    <FormGroup>
                        <FormText>
                            Player can only be added to an active team. Will be added as an active player. To change active status, manage on player information page
                        </FormText>
                        <Input
                            id='team'
                            name='team'
                            type='select'
                            value={formData.team}
                            onChange={handleChange}
                            required
                        >
                            <option></option>
                            {teams.map(t => {
                                if (t.isActive) {
                                    return <option key={t.code}
                                        value={t.code}>
                                        {t.teamName}
                                    </option>
                                }
                            })}
                        </Input>
                    </FormGroup>
                    <div className='AddAssociationForm-btn-options'>
                        <Button outline
                            className="AddAssociationForm-btn"
                            // disabled={formData.team === '' ? true : false}
                            >
                            Save
                        </Button>
                        <Button outline
                            className="AddAssociationForm-cancel-btn"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            }
        </Card>
    )
}

export default AddAssociationForm;