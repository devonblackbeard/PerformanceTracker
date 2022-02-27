import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Workout } from "../models/workout";


export default class WorkoutStore {
  workoutRegistry = new Map<string, Workout>();
  selectedWorkout: Workout | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this)
  }

  get getWorkouts() {
    return Array.from(this.workoutRegistry.values());
  }

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Workouts.list();
      activities.forEach((a=> {
       this.setWorkout(a);
     }))
     this.setLoadingInitital(false);
     return activities;
    }
    catch(error) {
      console.log('error ', error);
      this.setLoadingInitital(false);
    }
  }

  loadWorkout = async (id: string) => {
    let workout = this.getWorkout(id);
    if(workout){
      this.selectedWorkout = workout;
      return workout;
    }
    else {
      this.loadingInitial = true;
      try{
        workout = await agent.Workouts.details(id);
        this.setWorkout(workout);
        runInAction(() => {
          this.selectedWorkout = workout;
        })
        this.setLoadingInitital(false);
        return workout;
      }
      catch (error){
        this.setLoadingInitital(false);
      }
    }
  }

  private setWorkout = (wo: Workout) => {
    this.workoutRegistry.set(String(wo.id), wo);
  }

  private getWorkout = (id: string) => {
    return this.workoutRegistry.get(id);
  }

  setLoadingInitital = (state: boolean) => {
    this.loadingInitial = state;
  }

  // createActivity = async(activity: Activity) => {
  //   this.loading = true;
  //   activity.id = uuid();
  //   try{
  //     await agent.Activities.create(activity);
  //     runInAction(() => {
  //       this.workoutRegistry.set(activity.id, activity);
  //       this.selectedActivity = activity;
  //       this.editMode = false;
  //       this.loading = false;
  //     })
  //   }
  //   catch(error){
  //     runInAction(()=> {
  //       this.loading = false;
  //     })
  //     console.log(error);
  //   }
  // }

  // updateActivity = async (activity: Activity) => {
  //   this.loading = true;
  //   try{
  //     await agent.Activities.update(activity);
  //     runInAction(() => {
  //       this.workoutRegistry.set(activity.id, activity);
  //       this.selectedActivity = activity;
  //       this.editMode = false;
  //       this.loading = false;
  //     })
  //   }
  //   catch(error){
  //     console.log(error);
  //     runInAction(()=> {
  //       this.loading = false;
  //     })
  //   }
  // }

  // deleteActivity = async (id: string) => {
  //   this.loading = true;
  //   try{
  //     await agent.Activities.delete(id);
  //     runInAction(() => {
  //       this.workoutRegistry.delete(id);
  //       this.loading = false;
  //     })
  //   }
  //   catch(error){
  //     console.log(error);
  //     runInAction(() => {
  //       this.loading = false;
  //     })
  //   }

  // }

}


