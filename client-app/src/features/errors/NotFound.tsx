import { Link } from "react-router-dom"
import { Header, Segment, Icon, Button } from "semantic-ui-react"

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops we were not able to find your page
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Return to Activities
                </Button>
            </Segment.Inline>
        </Segment>
    )


}