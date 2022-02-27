import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'


export default function NavBar() {

  const {workoutStore} = useStore();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
          Performance
        </Menu.Item>
        <Menu.Item as={NavLink} to='/workouts' name='Workouts'>
          Workout
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} to='/createWorkout' positive content='Create Workout' />
        </Menu.Item>
      </Container>

    </Menu>
  )
}
