// redux/reducers/setJWTReducer.ts
const initialState = {
	jwt: '',
}

export const setJWTReducer = (
	state = initialState, action: {type: string, jwt: string}) => {
		switch (action.type) {
			case 'SET_JWT':
				return {jwt: action.jwt}
			default:
				return state
		}
}
