import axios, { AxiosResponse } from 'axios';
import { Workout } from '../models/workout';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  // post: <T> (url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
  // put: <T> (url: string, body:{}) => axios.put<T>(url,body).then(responseBody),
  // delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Workouts = {
  list: () => requests.get<Workout[]>('/workouts'),
  details: (id: string) => requests.get<Workout>(`/workouts/${id}`),
  // create: (workout: Workout) => requests.post<void>('/activities', workout),
  // update: (workout: Workout) => requests.put<void>(`/activities/${workout.id}`, workout),
  // delete: (id: string) => requests.delete<void>(`/activities/${id}`)
}

const agent = {
  Workouts
}

export default agent;
