// import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';


export default function WorkoutList() {
  const {activityStore} = useStore();
  // const {deleteActivity, activitiesByDate, loading} = activityStore;
  const { getWorkouts } = activityStore;
  const [target, setTarget] = useState('');

  function handleWorkoutDelete(e: SyntheticEvent<HTMLButtonElement>, id:string) {
    setTarget(e.currentTarget.name);
  //  deleteActivity(id);
  }

  console.log(getWorkouts);

  return (
      <Segment>
        <h2>List</h2>
        <Item.Group divided>
          {getWorkouts.map(workout => {
            return <Item key={workout.id}>
                <Item.Content>
                  <Item.Header as='a'>{workout.name}</Item.Header>

                  <Item.Description>

                  </Item.Description>
                  <Item.Extra>
                    <Button as={Link} to={`/workouts/${workout.id}`} floated='right' content='View' color='blue'/>
                    <Button
                      name={workout.id}
                      loading={target === workout.id}
                      onClick={(e) => handleWorkoutDelete(e, workout.id)}
                      floated='right'
                      content='Delete'
                      color='red'
                    />
                    {/* <Label basic content={workout.category}/> */}

                  </Item.Extra>
                </Item.Content>

            </Item>
          })}
        </Item.Group>
      </Segment>
  )
}
