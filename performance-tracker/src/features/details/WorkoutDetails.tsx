import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image, Item, List } from 'semantic-ui-react'
import LoadingComponent from '../../app/layout/LoadingComponents';
import { Move } from '../../app/models/move';
import { useStore } from '../../app/stores/store';


export default observer(function WorkoutDetails() {

  const {workoutStore} = useStore();
  const {selectedWorkout: workout, loadWorkout, loadingInitial} = workoutStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadWorkout(id);
  }, [id, loadWorkout])

  console.log(workout)

  if(loadingInitial || !workout) {
    return <LoadingComponent content={''} />;
  }

  return (
  <Card fluid>

    <Card.Content>
      <Card.Header>{workout.name}</Card.Header>
      <Card.Meta>
        {/* <span>{workout.date}</span> */}

        </Card.Meta>
        <List ordered>
          {workout.moves.map((move: any) =>
          <List.Item key={move.id}>{move.name} </List.Item>
          )}

        </List>

    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
        <Button as={Link} to={`/manage/${workout.id}`} basic color='blue' content='Edit' />
        <Button as={Link} to='/workouts' basic color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>

  )
})

