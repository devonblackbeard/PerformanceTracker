import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Form, Image, Item, Label, List, Segment, Select } from 'semantic-ui-react'
import LoadingComponent from '../../app/layout/LoadingComponents';
import { Move } from '../../app/models/move';
import { Workout } from '../../app/models/workout';

import { useStore } from '../../app/stores/store';


export default observer(function WorkoutEntry() {

  const {workoutStore} = useStore();
  const {getWorkouts, loadWorkout} = workoutStore;
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();


  const {date} = useParams<{date: string}>();

 // console.log('get workouts', getWorkouts);
 // const [myWorkout, setWorkout] = useState<Workout>();

  let options = getWorkouts.map(a => {
    return {
      key: a.id, text: a.name, value: a.id, m: a.moves
    }
  });

  let moves = []

  useEffect(() => {
    console.log('in UseEffect');
    options = getWorkouts.map(a => {
       return {
         key: a.id, text: a.name, value: a.id, m: a.moves
       }
    });

    console.log(options)
  }, [workoutStore])


  const changeWorkout = async (event: any, result: any) => { // result.value has id
    console.log('changeworkout', event, result);
    const loadedWorkout = await loadWorkout(result.value);
    if (loadedWorkout) setSelectedWorkout(loadedWorkout);
  }

  // if(loadingInitial || !workout) {
  //   return <LoadingComponent content={''} />;
  // }

  return (
  <Segment>
    <div>
      <Form>
        <div>
          {date.substring(0,10)}
        </div>
        <div className='entry'>
          <Form.Group>
            <div className='workoutNameEntry'>
              <Form.Field control={Select} type='select' onChange={changeWorkout} options={options} label='Name' />

            {selectedWorkout?.moves.map((move: Move) =>
            <div>
              <Form.Field>
              {move.name}
              </Form.Field>

              <Form.Input>

              </Form.Input>
            </div>


            )}
            </div>
          </Form.Group>
        </div>

      </Form>
    </div>
  </Segment>

  )
})


