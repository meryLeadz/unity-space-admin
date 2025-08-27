import * as React from 'react';
import './App.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';
import authProvider from './authProvider';
import LoginPage from './LoginPage';

const dataProvider = fakeDataProvider({
  users: [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
  ]
});

function App() {
  return (
    <Admin
      loginPage={() => <LoginPage authProvider={authProvider} />}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
}

export default App;
