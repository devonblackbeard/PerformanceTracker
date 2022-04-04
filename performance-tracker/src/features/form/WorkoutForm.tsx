import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Input, List, Segment } from 'semantic-ui-react';
import { Move } from '../../app/models/move';
import { useStore } from '../../app/stores/store';


export default observer(function WorkoutForm() {
  const {workoutStore} = useStore();
  const {selectedWorkout, loadWorkout, loadingInitial, loading, updateWorkout, createWorkout } = workoutStore;
  const {id} = useParams<{id: string}>();


  const [workout, setWorkout] = useState({
    id: '',
    name: '',
    moves: [{ id: 0, name: ''}]
  });

  const [newMove, setNewMove] = useState({
    id: 0,
    name: ''
  });


  useEffect(()=> {
    if(id) loadWorkout(id).then(workout => setWorkout(workout!))
    else{
     setWorkout({id: '', name: '', moves: []});
    };
  }, [id, loadWorkout]);


  function handleWorkoutNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setWorkout({...workout, [name]: value });
  }

  function handleMovesInputChange(moveId: number, name: string) {
     runInAction(() => {
        const move = workout.moves.find(w=> w.id === moveId);
        if(move) move.name = name;
     });
     setWorkout({...workout});
  }

  function handleNewMoveInputChange(newMoveName: string){
    const rand = Math.floor(Math.random() * 1000);

    setNewMove({id: rand, name: newMoveName});
    console.log(newMove);
  }

  function handleAddMove(event: any) {
    setWorkout({...workout, moves: [...workout.moves, newMove]  });
    setNewMove({id:0, name: ''});
    console.log('new mvoe', newMove);
  }

  function handleSubmit() {
    workout.id ? updateWorkout(workout) : createWorkout(workout);
  }

  return(
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off' >
        Name

        <Form.Input value={workout.name} name='name' onChange={handleWorkoutNameChange} />
        Moves

        <div>
          <Input type="text" value={newMove.name} style={{width: 200}} onChange={e => handleNewMoveInputChange(e.target.value)} />
          <Button positive content='Add' onClick={e => handleAddMove(e)} type='button' />
        </div>
          {workout.moves.map((move: Move) =>
            <Form.Input key={move.id} value={move.name} name='move' onChange={e => handleMovesInputChange(move.id, e.target.value)} />)
          }

        <Button floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/workouts' floated='right' type='button' content='Cancel' />

        </Form>
    </Segment>
  )

})


