import { Move } from "./move";

export interface WorkoutPayload {
  id: number;
  name: string;
  moves: Move[]
}
