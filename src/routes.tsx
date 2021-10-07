import { Route, Switch } from 'react-router-dom'
import Adventure from './Adventure'

function Routes() {
    return (
        <>
            <Route exact strict path="/adventures" component={Adventure} />
        </>
    )
}

export default Routes