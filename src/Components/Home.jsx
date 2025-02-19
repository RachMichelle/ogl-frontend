import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from "reactstrap"
import '../stylesheets/Home.css';
import userContext from "../userContext";

const Home = () => {
    const { user } = useContext(userContext)
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h1">
                        OGL
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2"
                        tag="h4"
                    >
                        Overwatch Gaming League
                    </CardSubtitle>
                    <CardText className="Home-text">
                        Where every player can compete like a pro
                    </CardText>
                    {/* determine what to display based on whether user is logged in */}
                    {!user.staffType &&
                        <CardFooter>
                            Want to compete? Contact a <Link
                                className="Home-contact-link"
                                to='/staff'>
                                staff member
                            </Link> to find out more.
                        </CardFooter>
                    }
                    {user.staffType &&
                        <CardFooter>
                          <CardSubtitle style={{backgroundColor: 'gold'}}>{user.staffType.toUpperCase()} VIEW</CardSubtitle>
                        </CardFooter>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default Home;