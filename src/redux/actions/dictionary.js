import actionType from './actionType'
import { Dictionary } from '@/services/api';
import { getStorage } from '@utils/storage';


export const getDictionaryAction = (data) => ({
    type: actionType.DICTIONARY,
    data
})

export const getDictionary = () => {
    return (dispatch)=> {
        Dictionary({token: getStorage('userInfo').token}).then(res => {
            const action = getDictionaryAction(res.data);
            dispatch(action)
        })
    }
}
