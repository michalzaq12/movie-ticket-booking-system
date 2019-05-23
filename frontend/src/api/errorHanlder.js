import EventBus from '../eventBus';

export default function errorHandler(error){
    if(IS_DEV) console.error('[API]: ' + error);
    
    const response = error.response;
    const msg = response ? response.data.error.message : 'Network Error';

    EventBus.$emit('loading', false)
    EventBus.$emit('error', msg)

    return Promise.reject(error);
}