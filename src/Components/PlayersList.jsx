// list of all players. Shows alias only, links to player info card

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import userContext from "../userContext";
import OglApi from '../api';
import '../stylesheets/PlayersList.css'

const PlayersList = () => {
    const [players, setPlayers] = useState(null);
    const { user } = useContext(userContext);

    // get list of players from database on mount
    useEffect(() => {
        const getPlayers = async () => {
            let allPlayers = await OglApi.getAll('players');
            setPlayers(allPlayers);
        }
        getPlayers();
    }, []);

    return (
        <Card className="PlayerList">
            <CardTitle>All Players</CardTitle>
            <CardBody>
                {/* "loading" until list of players saved to state */}
                {!players && <p>Loading...</p>}
                {players &&
                    <ListGroup className="PlayersList-list">
                        {/* add button for mod or admin */}
                        {user.staffType &&
                            <Link to={`/players/add`}
                                className="PlayersList-add-btn">
                                <Button outline>
                                    &#10133;
                                </Button>
                            </Link>}
                        {players.map(p => (
                            <ListGroupItem key={p.alias}
                                className="PlayersList-player">
                                <Link to={`/players/${p.alias}`}>
                                    {p.alias}
                                </Link>
                                {/* edit button only for logged in staff */}
                                {user.username &&
                                    <Link to={`/players/edit/${p.alias}`}
                                        className="PlayersList-edit-btn">
                                        <Button outline>&#9998;</Button>
                                    </Link>}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                }
            </CardBody>
        </Card>
    )
}

export default PlayersList;