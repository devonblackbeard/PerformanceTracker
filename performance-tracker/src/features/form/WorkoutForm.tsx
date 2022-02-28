import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function WorkoutForm() {
  const {workoutStore} = useStore();
  const {selectedWorkout, loadWorkout, loadingInitial, loading, updateWorkout, createWorkout } = workoutStore;
  const {id} = useParams<{id: string}>();


  const [workout, setWorkout] = useState({
    id: '',
    name: ''
  });


  useEffect(()=> {
    if(id) loadWorkout(id).then(workout => setWorkout(workout!));
  }, [id, loadWorkout]);


  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setWorkout({...workout, [name]:value });
  }

  function handleSubmit() {
    workout.id ? updateWorkout(workout) : createWorkout(workout);
  }

  return(
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off' >
        <Form.Input placeholder='Name' value={workout.name} name='name' onChange={handleInputChange}/>
        <Button floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' />

        </Form>
    </Segment>
  )
})
