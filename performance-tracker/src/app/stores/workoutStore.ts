import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Workout } from "../models/workout";
import { WorkoutPayload } from "../models/workoutpayload";


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

  loadWorkouts = async () => {
    this.loadingInitial = true;
    try {
      const workouts = await agent.Workouts.list();
      workouts.forEach((a=> {
       this.setWorkout(a);
     }))
     this.setLoadingInitital(false);
     return workouts;
    }
    catch(error) {
      console.log('error ', error);
      this.setLoadingInitital(false);
    }
  }

  loadWorkout = async (id: string) => {
    let workout = this.getWorkout(id);
    if(workout) {
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

  createWorkout = async (workout: Workout) => {
    this.loading = true;
    this.loadingInitial = true;
    let payload: WorkoutPayload = {
      id : 0,
      name : workout.name,
      moves : workout.moves
    };
    try {
      await agent.Workouts.create(payload);
      runInAction(() => {
        this.selectedWorkout = workout;
        this.editMode = false;
        this.loading = false;
      })

    }
    catch(error){
      runInAction(()=> {
        this.loading = false;
      })
      console.log(error);
    }
  }

  updateWorkout = async (workout: Workout) => {
    this.loading = true;
    try {
      await agent.Workouts.update(workout);
      runInAction(() => {
        this.workoutRegistry.set(String(workout.id), workout);
        this.selectedWorkout = workout;
        this.editMode = false;
        this.loading = false;
      })
    }
    catch(error){
      runInAction(()=> {
        this.loading = false;
      })
    }
  }

  deleteWorkout = async (id: string) => {
    this.loading = true;
    try{
      await agent.Workouts.delete(id);
      runInAction(() => {
        console.log('id: ', id);
        this.workoutRegistry.delete(String(id));
        this.loading = false;
    })
    }
    catch(error){
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }
}


