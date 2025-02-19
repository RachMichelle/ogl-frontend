import React, { useContext } from "react";
import userContext from "../userContext";
import { Link } from "react-router-dom";
import {
    Button,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";
import '../stylesheets/StaffListItem.css'

const StaffListItem = ({ username, name, pronouns, email }) => {
    const { user } = useContext(userContext);

    return (
        <ListGroupItem key={username}>
            <ListGroupItemHeading>
                {username}
            </ListGroupItemHeading>
            <ListGroupItemText>
                {name} ({pronouns})
            </ListGroupItemText>
            <ListGroupItemText>
                email: {email}
            </ListGroupItemText>
            {user.staffType === 'admin' &&
                <>
                    <Link to={`/staff/edit/${username}`}
                        className="StaffListItem-edit-btn">
                        <Button outline>
                            &#9998;
                        </Button>
                    </Link>
                    <Link to={`/staff/delete/${username}`}
                        className="StaffListItem-delete-btn">
                        <Button outline>
                            &#128465;
                        </Button>
                    </Link>
                </>}
        </ListGroupItem>
    )
}

export default StaffListItem