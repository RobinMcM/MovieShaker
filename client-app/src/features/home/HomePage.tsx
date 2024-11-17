import { Link } from "react-router-dom";
import { Container, Header, Image, Segment, Button } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Movieshaker
                </Header>
                <Header as='h2' inverted content='One Stop Shop to produce Films and Theatre' />
                <Button as={Link} to={'/Activities'} size='huge' inverted>My Account</Button>
            </Container>

        </Segment>
    )
}