import React from 'react';
import Calendar from 'react-calendar';
import { Container } from 'semantic-ui-react';
import 'react-calendar/dist/Calendar.css';


export default function HomePage() {
  return (

    <Container style={{ marginTop: '7em'}}>
      <h1 className="title">Calendar</h1>
      <div className='calendar'><Calendar calendarType='US' /></div>


    </Container>
  )
}
