// components/Login.tsx
import { Dispatch, useState, Fragment, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { AlertType } from '../models/ui-components'
import { Credentials } from '../models/tokens'
import { setJWTAction } from '../redux/actions/setJWTAction'
import Alert from './ui-components/Alert'
import Input from './form-components/Input'
import axios from 'axios'

const Login = (props: any) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [errors, setErrors] = useState<string[]>([])
	const [alert, setAlert] = useState<AlertType>({type: "d-none", message: ""})

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		// エラー初期化
		setErrors([])

		let submitErrors: string[] = []
		if (email === "") {
			submitErrors.push("email")
		}

		if (password === "") {
			submitErrors.push("password")
		}

		if (submitErrors.length > 0) {
			setErrors(submitErrors)
			return
		}

		const payload: Credentials = {
			username: email,
			password: password
		}

		await axios.post("signin", JSON.stringify(payload))
			.then((response) => {
				props.setJWT(response.data.response)

				props.history.push({
					pathname: "/admin"
				})
			})
			.catch((err) => {
				setError(err.response.data.error.message)
				setAlert({
					type: "alert-danger",
					message: err.response.data.error.message})
			})
	}

	const hasError = (key: string) => {
		return errors.indexOf(key) !== -1
	}

	return (
		<Fragment>
			<h2>Login</h2>
			<hr />
			<Alert
				alertType={alert.type}
				alertMessage={alert.message}
			/>
			<form className="pt-3" onSubmit={submit}>
				<Input
					title={"Email"}
					type={'email'}
					name={'email'}
					handleChange={setEmail}
					className={hasError("email") ? "is-invalid" : ""}
					errorDiv={hasError("email") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a valid email address"}
				/>
				<Input
					title={"Password"}
					type={'password'}
					name={'password'}
					handleChange={setPassword}
					className={hasError("password") ? "is-invalid" : ""}
					errorDiv={hasError("password") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a password"}
				/>

				<hr />
				<button className="btn btn-primary">Login</button>
			</form>
		</Fragment>
	)
}

export default connect( (state: {jwt: string}) => ({
	jwt: state.jwt
}),
(dispatch: Dispatch<any>) => ({
	setJWT: (jwt: string) => dispatch(setJWTAction(jwt))
})
)(Login)
