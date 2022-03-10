import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function WorkoutForm() {
  const {workoutStore} = useStore();
  const {selectedWorkout, loadWorkout, loadingInitial, loading, updateWorkout, createWorkout } = workoutStore;
  const {id} = useParams<{id: string}>();


  const [workout, setWorkout] = useState({
    id: '',
    name: '',
    moves: [{ id: '', name: ''}]
  });

  console.log('workout: ', workout);

  useEffect(()=> {
    if(id) loadWorkout(id).then(workout => setWorkout(workout!));
  }, [id, loadWorkout]);


  function handleWorkoutNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    console.log('in handle input');
    const {name, value} = event.target;
    var namex = event.target;
    console.log(namex.value);
    setWorkout({...workout, [name]: value });
  }

  function handleMovesInputChange(moveId: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //  console.log('in handle moves input change');
    const {name, value} = event.target;
    var namex = event.target;
    console.log(namex);
   //   console.log(workout);
    //setWorkout({...workout, [name]:value});

   // console.log(namex.value);
    setWorkout({...workout, moves: [{ id: moveId, name: value}]  });
  }

  function handleSubmit() {
    console.log(workout);
    workout.id ? updateWorkout(workout) : createWorkout(workout);
  }

  return(
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off' >
        Name
        <Form.Input placeholder='Name' value={workout.name} name='name' onChange={handleWorkoutNameChange} />
        Moves

          {workout.moves.map((move: any) =>
            <Form.Input key={move.id} value={move.name} name='move' onChange={e => handleMovesInputChange(move.id, e)} />
          )}

        {/* <Form.Input placeholder='Name' value={workout.move.name} name='move.name' onChange={handleInputChange} /> */}


        <Button floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/workouts' floated='right' type='button' content='Cancel' />

        </Form>
    </Segment>
  )
})
