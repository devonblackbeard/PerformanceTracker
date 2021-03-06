import axios, { AxiosResponse } from 'axios';
import { Workout } from '../models/workout';
import { WorkoutPayload } from '../models/workoutpayload';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
  try {
    await sleep(100);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
  put: <T> (url: string, body:{}) => axios.put<T>(url,body).then(responseBody),
  delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Workouts = {
  list: () => requests.get<Workout[]>('/workouts'),
  details: (id: string) => requests.get<Workout>(`/workouts/${id}`),
  create: (workout: WorkoutPayload) => requests.post<void>('/workouts', workout),
  update: (workout: Workout) => requests.put<void>(`/workouts/${workout.id}`, workout),
  delete: (id: string) => requests.delete<void>(`/workouts/${id}`)
}

const agent = {
  Workouts
}

export default agent;
