import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'


export default function Dashboard() {
  const { activityStore } = useStore();

  // useEffect(() => {
  //    activityStore.loadActivities();
  //   }, [activityStore] )


  return (
    <Grid>
      <h2>Workouts</h2>
      <Grid.Column width='10'>
        {/* <ActivityList /> */}
      </Grid.Column>

      <Grid.Column width='6'>

      </Grid.Column>

    </Grid>
  )
}
