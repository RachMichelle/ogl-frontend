// list of all teams -> 
// card with nav tabs for 2 panes -> active or inactive
// team name only, links to team info card

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Button
} from "reactstrap";
import userContext from "../userContext";
import OglApi from '../api';
import '../stylesheets/TeamList.css'


const TeamsList = () => {
    const [teams, setTeams] = useState(null);
    // state for current active tab
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    const { user } = useContext(userContext);

    // toggle active state for tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab)
    }

    // get list of teams from database on mount
    useEffect(() => {
        const getTeams = async () => {
            let teamList = await OglApi.getAll('teams');
            setTeams(teamList);
        }
        getTeams();
    }, []);

    return (
        <Card className="TeamList">
            <CardTitle>Teams</CardTitle>
            {!teams && <p>Loading...</p>}
            {/* add button for mod or admin */}
            {user.staffType &&
                <Link to={`/teams/add`}
                    className="TeamsList-add-btn">
                    <Button outline>
                        &#10133;
                    </Button>
                </Link>}
            {teams &&
                <>
                    <Nav tabs>
                        <NavItem className="TeamList-nav-item">
                            <NavLink
                                className={currentActiveTab === '1' ?
                                    "active" : "inactive"
                                }
                                onClick={() => { toggle('1'); }}
                            >
                                Active
                            </NavLink>
                        </NavItem>
                        <NavItem className="TeamList-nav-item">
                            <NavLink
                                className={currentActiveTab === '2' ?
                                    "active" : "inactive"
                                }
                                onClick={() => { toggle('2'); }}
                            >
                                Inactive
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={currentActiveTab}>
                        <TabPane tabId="1">
                            <ListGroup>
                                {teams.map(t => {
                                    // list teams with isActive status true
                                    if (t.isActive === true) {
                                        return (
                                            <ListGroupItem key={t.code}
                                                className="TeamList-team">
                                                <Link to={`/teams/${t.code}`}>
                                                    {t.teamName}
                                                </Link>
                                                {/* edit button only for logged in staff */}
                                                {user.username &&
                                                    <Link to={`/teams/edit/${t.code}`}
                                                        className="TeamsList-edit-btn">
                                                        <Button outline>&#9998;</Button>
                                                    </Link>}
                                            </ListGroupItem>
                                        )
                                    }
                                })}
                            </ListGroup>
                        </TabPane>
                        <TabPane tabId="2">
                            <ListGroup>
                                {teams.map(t => {
                                    // list teams with isActive status false
                                    if (t.isActive === false) {
                                        return (
                                            <ListGroupItem key={t.code}
                                                className="TeamList-team">
                                                <Link to={`/teams/${t.code}`}>
                                                    {t.teamName}
                                                </Link>
                                                {/* edit button only for logged in staff */}
                                                {user.username &&
                                                    <Link to={`/teams/edit/${t.code}`}
                                                        className="TeamsList-edit-btn">
                                                        <Button outline>&#9998;</Button>
                                                    </Link>}
                                            </ListGroupItem>
                                        )
                                    }
                                })}
                            </ListGroup>
                        </TabPane>
                    </TabContent>
                </>
            }
        </Card>
    )
}

export default TeamsList;