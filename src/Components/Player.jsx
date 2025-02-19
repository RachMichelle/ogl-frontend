// card for individual player info
// conditional logic for optional info (pronouns, country of origin) and whether or not to list current/former teams based on active status / existence of former team
// function hasFormerTeams to determine if former teams are present for player.

import React, { useEffect, useState, useContext, act } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    Row,
    Col,
    CardText,
    CardSubtitle,
    CardBody,
    ListGroupItem,
    ListGroup,
    Button
} from "reactstrap";
import userContext from "../userContext";
import OglApi from "../api";
import '../stylesheets/Player.css'

const Player = () => {
    const { alias } = useParams();
    const { user } = useContext(userContext);

    const [player, setPlayer] = useState(null);
    const [updateMade, setUpdateMade] = useState(true);

    // get player info on mount
    useEffect(() => {
        const getPlayer = async () => {
            if (updateMade) {
                let playerInfo = await OglApi.getOne('players', 'player', alias);
                setPlayer(player => playerInfo);
                setUpdateMade(updateMade => false);
            }
        }
        getPlayer();
    }, [updateMade]);

    // if API call returns undefined & player does not exist, navigate back to players page
    if (player === undefined) return <Navigate to='/players' />

    // check if player has has former teams to list
    const hasFormerTeams = () => {
        let formerTeams = player.teams.filter(t => t.activeMember === false);
        if (formerTeams.length) return true;
        return false;
    }

    const makeActive = async (e) => {
        const team = e.target.name;
        const token = user.token
        let success = await OglApi.manageActiveStatus(alias, team, true, token);

        if (success) setUpdateMade(updateMade => true);
    }

    const makeInactive = async (e) => {
        const team = e.target.name;
        const token = user.token
        let success = await OglApi.manageActiveStatus(alias, team, false, token);

        if (success) setUpdateMade(updateMade => true);
    }

    return (
        <Card className="Player">
            {!player && <p>Loading...</p>}
            {player &&
                <>
                    {/* edit button & manage teams only for logged in staff */}
                    {user.username &&
                        <>
                            <Link to={`/players/teams/${alias}`}
                                className="Player-teams-link">
                                Add Team Association
                            </Link>
                            <Link to={`/players/edit/${alias}`}
                                className="Player-edit-btn">
                                <Button outline>&#9998;</Button>
                            </Link>
                        </>}
                    <CardHeader>
                        <Row className="align-items-center">
                            <Col>
                                <CardTitle>{alias}</CardTitle>
                            </Col>
                            <Col>
                                <CardText>{player.firstName} {player.lastInitial}</CardText>
                                {/* pronouns & country optional-only render if present */}
                                {player.preferredPronouns &&
                                    <CardText>{player.preferredPronouns}</CardText>
                                }
                                {player.countryOrigin &&
                                    <CardText>{player.countryOrigin}</CardText>
                                }
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle className="Player-role">
                            Main Role: {player.mainRole}
                        </CardSubtitle>
                        {/* only render current team for player actively competing */}
                        {player.isActive &&
                            <div className="Player-team-list">
                                <CardSubtitle> Current Team: </CardSubtitle>
                                <ListGroup>
                                    {player.teams.map(t => {
                                        if (t.activeMember) {
                                            return (
                                                <ListGroupItem key={t.code}
                                                    className="Player-team-link">
                                                    <Link to={`/teams/${t.code}`}>
                                                        {t.teamName}
                                                    </Link>
                                                    {user.username &&
                                                        <Button outline
                                                            className="Player-make-inactive-btn"
                                                            name={t.code}
                                                            data-isactive={t.activeMember}
                                                            onClick={makeInactive}>
                                                            &#10134;
                                                        </Button>}
                                                </ListGroupItem>
                                            )
                                        }
                                    })}
                                </ListGroup>
                            </div>
                        }
                        {/* Former teams applicable for active and inactive players, but only render if player has former teams to list*/}
                        {hasFormerTeams() &&
                            <div className="Player-team-list">
                                <CardSubtitle> Former team(s)</CardSubtitle>
                                <ListGroup>
                                    {player.teams.map(t => {
                                        if (!t.activeMember) {
                                            return (
                                                <ListGroupItem key={t.code}
                                                    className="Player-team-link">
                                                    <Link to={`/teams/${t.code}`}>
                                                        {t.teamName}
                                                    </Link>
                                                    {user.username &&
                                                        <Button outline
                                                            className="Player-make-active-btn"
                                                            name={t.code}
                                                            onClick={makeActive}>
                                                            &#10133;
                                                        </Button>}
                                                </ListGroupItem>
                                            )
                                        }
                                    })}
                                </ListGroup>
                            </div>
                        }
                        {/* player is not active and is not associated with any teams */}
                        {!player.isActive && !hasFormerTeams() &&
                            <CardText className="Player-text">
                                No associated teams
                            </CardText>}
                    </CardBody>
                </>
            }
        </Card>
    )
}

export default Player