import { createContext, useContext } from "react";
import WorkoutStore from "./workoutStore";

interface Store {
  workoutStore: WorkoutStore
}

export const store: Store = {
  workoutStore: new WorkoutStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
