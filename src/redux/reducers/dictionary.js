import actionType from "../actions/actionType";

const initState = []

const dictionary = (state = initState, action) => {
    // console.log('action', action)
    // console.log(state)
    switch(action.type) {
        case actionType.DICTIONARY:
            return action.data
        default: 
            return state
    }
}

export default dictionary
