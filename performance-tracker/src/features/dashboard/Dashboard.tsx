import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import WorkoutList from './WorkoutList';
import LoadingComponent from '../../app/layout/LoadingComponents'
import { observer } from 'mobx-react-lite'


export default observer(function Dashboard() {
  const { workoutStore } = useStore();

  useEffect(() => {
    workoutStore.loadActivities();
    }, [workoutStore] )

  if (workoutStore.loadingInitial){
    return <LoadingComponent content='Loading App' />
  }


  return (
    <Grid>
      <h2>Workouts</h2>
      <Grid.Column width='10'>
        <WorkoutList />
      </Grid.Column>

      <Grid.Column width='6'>

      </Grid.Column>

    </Grid>
  )
})
