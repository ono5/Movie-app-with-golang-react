// redux/actions/setJWTAction.ts
export const setJWTAction = (jwt: string) => ({
	type: 'SET_JWT',
	jwt
})
