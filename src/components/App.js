import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route } from 'react-router-dom';

import AddressBook from './AddressBook';
import ContactDetails from './ContactDetails';
import Empty from './Empty';
import Router from './Router';
import Theme from './Theme';

/*
I would like to commit this line, but eslint is not letting me... 
Anyway, it would be like this, but it doesn't work:

<Route path="/:id" render={props => <ContactDetails key={props.match.params.id} />}/>
*/
const App = () => (
  <Router>
    <Theme>
      <AddressBook>
        <Route path="/:id" component={ContactDetails} />
        <Route component={Empty} />
      </AddressBook>
    </Theme>
  </Router>
);

export default hot(App);
