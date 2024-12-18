import axios, { AxiosError, AxiosResponse } from 'axios'
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;

}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:   
            if(data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors){
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                    throw modalStateErrors.flat();
                }
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorised')
            break;
        case 403:
            toast.error('Fforbidden')
            break;
        case 404:
            router.navigate('/not-found');
            toast.error('Not Found')
            break;
        case 500:
            toast.error('Server Error')
            break;            
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>)  => response.data;

const requests = {
    /* eslint-disable */
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string , body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
    /* eslint-enable */
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)

}

const agent = {
    Activities
}

export default agent;