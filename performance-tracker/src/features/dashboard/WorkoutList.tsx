// import { observer } from 'mobx-react-lite';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';


export default observer(function WorkoutList() {
  const { workoutStore } = useStore();
  const { deleteWorkout, loading} = workoutStore;
  const { getWorkouts } = workoutStore;
  const [target, setTarget] = useState('');

  function handleWorkoutDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    console.log('delete workout');
    setTarget(e.currentTarget.name);
    deleteWorkout(id);
  }

  return (
      <Segment>
        <Item.Group divided>
          {getWorkouts.map(workout => {
            return <Item key={workout.id}>
                <Item.Content>
                  <Item.Header as='a'>{workout.name}</Item.Header>
                  <Item.Description>
                  </Item.Description>
                  <Item.Extra>
                    <Button
                      name={workout.id}
                      loading={target === workout.id}
                      onClick={(e) => handleWorkoutDelete(e, workout.id)}
                      floated='right'
                      content='Delete'
                      color='red'
                    />

                    <Button as={Link} to={`/workouts/${workout.id}`}
                     floated='right'
                     content='View'
                     color='blue'
                    />

                  </Item.Extra>
                </Item.Content>

            </Item>
          })}
        </Item.Group>
      </Segment>
  )
})
