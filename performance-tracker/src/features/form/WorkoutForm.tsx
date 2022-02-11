import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function WorkoutForm() {
  console.log('in form');


  const [workout, setWorkout] = useState({
    name:''
  });


  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setWorkout({...workout, [name]:value });
  }

  function handleSubmit() {
    // activity.id ? updateActivity(activity) : createActivity(activity);
    console.log('on handle submit');
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
}
