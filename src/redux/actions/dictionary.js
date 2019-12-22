import actionType from './actionType'
import { Dictionary } from '@/services/api';
import { getStorage } from '@utils/storage';


export const getDictionaryAction = (data) => ({
    type: actionType.DICTIONARY,
    data
})

export const getDictionary = () => {
    const token = getStorage('userInfo') ? getStorage('userInfo').token : '';
    return (dispatch)=> {
        Dictionary({token: token}).then(res => {
            const action = getDictionaryAction(res.data);
            dispatch(action)
        })
    }
}
