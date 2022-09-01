import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Button, Container, Dropdown, Form, Segment, Select } from 'semantic-ui-react';
import 'react-calendar/dist/Calendar.css';
import { useStore } from '../../app/stores/store';
import { NavLink } from 'react-router-dom';


export default function HomePage() {
  const {workoutStore} = useStore();
  const [value, setDate] = useState(new Date());
  const { getWorkouts, loadWorkout } = workoutStore;

  let options = getWorkouts.map(a => {
    return {
      key: a.id, text: a.name, value: a.id
    }
  });

  const [workoutId, setId] = useState(111);

  useEffect(() => {
    console.log('in UseEffect');

    options = getWorkouts.map(a => {
       return {
         key: a.id, text: a.name, value: a.id
       }
    });
    console.log('opt', options)
  }, [value])


   if (options.length ===0) {
     console.log('i dont have workouts');
     workoutStore.loadWorkouts()
   }


    console.log('options', options);
    //   const [workoutValue, setWorkout] = useState({id: 111, name: 'Chest and Back'});
    //options[0].value, name: options[0].text
    // console.log(workoutValue)

    const changeWorkout = (event: any, result: any) => { // result.value has id
      console.log('result', result)
      setId(result.value);
    }

  // function selectDay(day: any) {
  //   console.log('in date', value);
  // }


  return (

    <Container style={{ marginTop: '7em'}} >
      <h1 className="title">Calendar</h1>

      <div className='flex'>
        <div>
          <div className='topCalendar'>
            <Button positive content='Add' as={NavLink} to={`/workoutEntry/${value}`} type='button' className='addButton' />
          </div>

          <div className='calendar'><Calendar onChange={setDate} value={value} calendarType='US' /></div>
        </div>


        <div className='addWorkout'>
          {/* <Form>
            <Form.Group widths='equal'>

              <Form.Field control={Select} type='select' onChange={changeWorkout} options={options} label='Name' />
            </Form.Group>

          </Form> */}
        </div>

      </div>

    </Container>


  )


}
