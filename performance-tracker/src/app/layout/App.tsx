import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import HomePage from '../../features/home/HomePage';
import Dashboard from '../../features/dashboard/Dashboard';
import WorkoutForm from '../../features/form/WorkoutForm';

function App() {
  return (
  <>
  <NavBar />
     <Container style={{marginTop:'7em'}}>

      <Route path='/' exact component={HomePage} />
      <Route exact path='/workouts' component={Dashboard} />
      <Route exact path='/createWorkout' component={WorkoutForm} />

    </Container>
  </>
  );
}

export default App;
