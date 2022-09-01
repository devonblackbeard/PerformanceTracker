import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import HomePage from '../../features/home/HomePage';
import Dashboard from '../../features/dashboard/Dashboard';
import WorkoutForm from '../../features/form/WorkoutForm';
import WorkoutDetails from '../../features/details/WorkoutDetails';
import { observer } from 'mobx-react-lite';
import WorkoutEntry from '../../features/entry/WorkoutEntry';



function App() {
  return (
  <>
  <NavBar />
     <Container style={{marginTop:'7em'}}>

      <Route path='/' exact component={HomePage} />
      <Route exact path='/workouts' component={Dashboard} />
      <Route path='/workouts/:id' component={WorkoutDetails} />
      <Route path={['/createWorkout', '/editWorkout/:id']} component={WorkoutForm} />
      <Route path='/workoutEntry/:date' component={WorkoutEntry} />


    </Container>
  </>
  );
}

export default observer(App);
