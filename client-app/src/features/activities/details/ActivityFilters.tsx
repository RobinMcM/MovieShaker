import Calendar from "react-calendar"
import { Header, Menu } from "semantic-ui-react"
export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: 28 }}>
                <Header icon='filter' attached color="teal" content='filters' />
                <Menu.Item content='All Activities' />
                <Menu.Item content='I am Attending' />
                <Menu.Item content='I am Hosting' />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}