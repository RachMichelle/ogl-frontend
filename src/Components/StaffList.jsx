// list of staff split into categories -> Admin or Mod

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import OglApi from '../api';
import {
    Card,
    CardSubtitle,
    CardTitle,
    ListGroup,
    Button
} from "reactstrap";
import userContext from "../userContext";
import StaffListItem from "./StaffListItem";
import '../stylesheets/StaffList.css'

const StaffList = () => {
    const [staffMembers, setStaff] = useState(null);

    const { user } = useContext(userContext);

    // get list of staff from database on mount
    useEffect(() => {
        const getStaff = async () => {
            let staff = await OglApi.getAll('staff');
            setStaff(staff);
        }
        getStaff();
    }, []);

    return (
        <Card className="StaffList">
            <CardTitle>
                OGL Staff
            </CardTitle>
            {/* "loading" until list of staff members saved to state */}
            {!staffMembers && <p>Loading...</p>}
            {staffMembers &&
                <>
                {/* add link render for admin only */}
                    {user.staffType === 'admin' &&
                        <Link to={`/staff/add`}
                            className="StaffList-add-btn">
                            <Button outline>
                                &#10133;
                            </Button>
                        </Link>}
                    <div className="StaffList-type">
                        <CardSubtitle>Administrators</CardSubtitle>
                        <ListGroup flush>
                            {staffMembers.map(s => {
                                // list only staff members with staffType "admin"
                                if (s.staffType === 'admin') {
                                    return <StaffListItem key={s.username}
                                        username={s.username}
                                        name={s.firstName + ' ' + s.lastInitial}
                                        pronouns={s.preferredPronouns}
                                        email={s.email} />
                                }
                            })}
                        </ListGroup>
                    </div>
                    <div className="StaffList-type">
                        <CardSubtitle>Moderators</CardSubtitle>
                        <ListGroup flush>
                            {staffMembers.map(s => {
                                // list only staff members with staffType "mod"
                                if (s.staffType === 'mod') {
                                    return <StaffListItem key={s.username}
                                        username={s.username}
                                        name={s.firstName + ' ' + s.lastInitial}
                                        pronouns={s.preferredPronouns}
                                        email={s.email} />
                                }
                            })}
                        </ListGroup>
                    </div>
                </>
            }
        </Card>
    )
}

export default StaffList;