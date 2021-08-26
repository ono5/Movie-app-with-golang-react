// components/Login.tsx
import { useState, Fragment, SyntheticEvent } from 'react'
import { AlertType } from '../models/ui-components'
import Alert from './ui-components/Alert'
import Input from './form-components/Input'

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [errors, setErrors] = useState<string[]>([])
	const [alert, setAlert] = useState<AlertType>({type: "d-none", message: ""})

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
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


export default Login
