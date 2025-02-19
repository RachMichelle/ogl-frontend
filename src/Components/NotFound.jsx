// for 404

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardFooter } from "reactstrap"
import "../stylesheets/NotFound.css"

const NotFound = () => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h1">
                        ?
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2"
                        tag="h4"
                    >
                        We couldn't find that.
                    </CardSubtitle>
                    <CardFooter>
                        <Link className="NotFound-return-link"
                            to='/'>
                            Go home
                        </Link>
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    )
}

export default NotFound