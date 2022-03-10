import { Move } from "./move";

export interface Workout {
  id: string,
  name: string,
  moves: Move[]
}
