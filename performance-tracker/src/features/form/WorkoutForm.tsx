import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Icon, Input, List, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponents';
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
    console.log('in use effect');
    if(id) loadWorkout(id).then(workout => setWorkout(workout!))
    else{
     setWorkout({id: '', name: '', moves: []});
    };
  }, [id, loadWorkout]);

  
  if(loading) {
    return <LoadingComponent content={''} />;
  }

  function handleWorkoutNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setWorkout({...workout, [name]: value });
  }

  function handleMovesInputChange(moveId: number, name: string) {
     runInAction(() => {
        const move = workout.moves.find(w=> w.id === moveId);
        if(move) move.name = name;
     });
     setWorkout(workout);
  }

  function handleNewMoveInputChange(newMoveName: string) {
    setNewMove({id: 0, name: newMoveName});
  }

  function getMaxId() {
    const max = workout.moves.reduce((a, b) => b.id > a ? b.id : a, 0);
    return max;
  }

  function handleAddMove(event: any) {
    const maxId = getMaxId();
    newMove.id = maxId + 1;
    setWorkout({...workout, moves: [...workout.moves, newMove]  });
    setNewMove({id: 0, name: ''});
  }

  function removeMove(move: Move) {
    const moves = workout.moves.filter(m => m !== move);
    setWorkout({...workout, moves});
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

        <div style={{marginBottom: 30}}>
          <Input type="text" value={newMove.name} style={{width: 200}} onChange={e => handleNewMoveInputChange(e.target.value)} />
          <Button positive content='Add' onClick={e => handleAddMove(e)} type='button' />
        </div>
          {workout.moves.map((move: Move) =>
            <Form.Input
              icon={{ name: 'remove', circular: true, link: true, onClick: () => removeMove(move) }}
              key={move.id}
              value={move.name}
              onChange={e => handleMovesInputChange(move.id, e.target.value)}
            />
          )}

        <Button floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/workouts' floated='right' type='button' content='Cancel' />

        </Form>
    </Segment>
  )

})


