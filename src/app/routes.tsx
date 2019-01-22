import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Error } from './components/Error';
import Container from './components/Container/Container';
import NewEvent from './components/NewEvent/NewEvent';
import EditEvent from './components/EditEvent/EditEvent';
import { DeleteEvent } from './components/DeleteEvent/DeleteEvent';

const createRoutes = (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Container} />
            <Route path="/new-event" component={NewEvent} />
            <Route path="/edit-event/:id" component={EditEvent} />
            <Route path="/delete-event" component={DeleteEvent} />
            <Route component={Error} />
        </Switch>
    </HashRouter>
);

export default createRoutes;