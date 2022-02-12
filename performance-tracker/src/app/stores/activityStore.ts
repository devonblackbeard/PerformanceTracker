// import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Workout } from "../models/workout";


export default class ActivityStore {
  workoutRegistry = new Map<string, Workout>();
  selectedActivity: Workout | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    // makeAutoObservable(this)
  }

  get getWorkouts() {
    return Array.from(this.workoutRegistry.values());
  }

  loadActivities= async () => {
    this.loadingInitial =true;
    try {
      const activities = await agent.Workouts.list();
      activities.forEach((a=> {
       this.setActivity(a);
       console.log(a);
     }))
      return activities;
     // this.setLoadingInitital(false);
    }
    catch(error) {
      console.log('error ', error);
     // this.setLoadingInitital(false);
    }
  }

  // loadActivity = async (id: string) => {
  //   let activity = this.getActivity(id);
  //   if(activity){
  //     this.selectedActivity = activity;
  //     return activity;
  //   }
  //   else {
  //     this.loadingInitial = true;
  //     try{
  //       activity = await agent.Activities.details(id);
  //       this.setActivity(activity);
  //       runInAction(() => {
  //         this.selectedActivity = activity;
  //       })
  //       this.setLoadingInitital(false);
  //       return activity;
  //     }
  //     catch (error){
  //       console.log(error);
  //       this.setLoadingInitital(false);
  //     }
  //   }
  // }

  private setActivity = (wo: Workout) => {
  //  activity.date = activity.date.split('T')[0];
    this.workoutRegistry.set(wo.id, wo);
  }

  // private getActivity = (id: string) => {
  //   return this.workoutRegistry.get(id);
  // }

  // setLoadingInitital = (state: boolean) => {
  //   this.loadingInitial = state;
  // }

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


