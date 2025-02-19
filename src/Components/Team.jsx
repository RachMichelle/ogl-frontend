// Info card for individual team 
// conditional logic based on wheter or not the team has active status

import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
    Card,
    CardText,
    CardTitle,
    Row,
    Col,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Button,
    CardBody
} from "reactstrap";
import userContext from "../userContext";
import OglApi from "../api";
import '../stylesheets/Team.css'

const Team = () => {
    const { code } = useParams();
    const { user } = useContext(userContext);

    const [team, setTeam] = useState(null);

    // get team info on mount
    useEffect(() => {
        const getTeam = async () => {
            let teamInfo = await OglApi.getOne('teams', 'team', code);
            setTeam(teamInfo);
        }
        getTeam();
    }, [])

    // if API call returns undefined & team does not exist, navigate back to teams page
    if (team === undefined) return <Navigate to='/teams' />

    // check if team has has former players to list
    const hasFormerPlayers = () => {
        let formerPlayers = team.players.filter(t => t.activeMember === false);
        if (formerPlayers.length) return true;
        return false;
    }

    // if team is found successfully
    return <Card className="Team">
        {!team && <p>Loading...</p>}
        {team &&
            <>
                {/* edit button for mod/admin */}
                {user.username && <Link to={`/teams/edit/${code}`}
                    className="TeamInfo-edit-btn">
                    <Button outline>&#9998;</Button>
                </Link>}
                <CardHeader>
                    {/* team overview */}
                    <Row className="align-items-center">
                        <Col>
                            <img className='Team-logo' src={team.logo}></img>
                        </Col>
                        <Col>
                            <CardTitle tag='h1'>{team.teamName}</CardTitle>
                            <CardText>Formed {team.establishedDate}</CardText>
                            <CardText>
                                {team.isActive
                                    ? 'Active'
                                    : 'Inactive'}
                            </CardText>
                            {team.isActive &&
                                <CardText className="Team-captain-link">Captain:
                                    <Link to={`/players/${team.captain}`}>
                                        {team.captain}
                                    </Link>
                                </CardText>}
                        </Col>
                    </Row>
                </CardHeader>
                {/* roster */}
                <Row>
                    {/* if team is not active, will have no active players. Only render on condition team is active */}
                    {team.isActive &&
                        <Col>
                            <CardTitle className="Team-player-title">
                                Current Roster
                            </CardTitle>
                            <ListGroup>
                                {team.players.map(p => {
                                    // only list players with activeMember = true
                                    if (p && p.activeMember)
                                        return (
                                            <ListGroupItem key={p.alias}
                                                className="Team-player">
                                                <Link to={`/players/${p.alias}`}>
                                                    {p.alias}
                                                </Link>
                                            </ListGroupItem>
                                        )
                                })}
                            </ListGroup>
                        </Col>
                    }
                    {/* former players can apply to active or inactive teams */}
                    {/* check for former players to determine render */}
                    {hasFormerPlayers() &&
                        <Col>
                            <CardTitle className="Team-player-title">
                                Former Players
                            </CardTitle>
                            <ListGroup>
                                {team.players.map(p => {
                                    // only list players with activeMember = false
                                    if (p && !p.activeMember)
                                        return (
                                            <ListGroupItem key={p.alias}
                                                className="Team-player">
                                                <Link to={`/players/${p.alias}`}>
                                                    {p.alias}
                                                </Link>
                                            </ListGroupItem>
                                        )
                                })}
                            </ListGroup>
                        </Col>
                    }
                    {/* text if team is inactive and has no former players */}
                    {!hasFormerPlayers() && !team.isActive &&
                        <Col>
                            <CardBody className="Team-text-section">
                                <CardText className="Team-text">
                                    No associated players
                                </CardText>
                            </CardBody>
                        </Col>}
                </Row>
            </>
        }
    </Card>
}

export default Team;