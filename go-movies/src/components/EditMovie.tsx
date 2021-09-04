// components/EditMovie.tsx
import { Dispatch, Fragment, useEffect, useState, SyntheticEvent } from "react"
import { connect } from 'react-redux'
import { setJWTAction } from '../redux/actions/setJWTAction'
import { AlertType } from '../models/ui-components'
import { Movie } from '../models/movie'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Input from './form-components/Input'
import TextArea from './form-components/TextArea'
import Select from './form-components/Select'
import Alert from './ui-components/Alert'
import './EditMovie.css'
import axios from 'axios'

const EditMovie = (props: any) => {
	const [movie, setMovie] = useState<Movie>()
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")
	const [errors, setErrors] = useState<string[]>([])
	const [alert, setAlert] = useState<AlertType>({type: "d-none", message: ""})

	// form data
	const [id, setID] = useState(0)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [releaseDate, setReleaseDate] = useState("")
	const [runtime, setRuntime] = useState(0)
	const [rating, setRating] = useState(0)
	const [mpaaRating, setMpaaRating] = useState("")
	const [mpaaOptions, setMpaaOptions] = useState([{}])

	useEffect(() => {
		if (props.jwt === "") {
			props.history.push({
				pathname: "/login"
			})
			return
		}

		(
			async () => {
				setMpaaOptions([
					{id: "G", value: "G"},
					{id: "PG", value: "PG"},
					{id: "PG13", value: "PG13"},
					{id: "R", value: "R"},
					{id: "NC17", value: "NC17"},
				])

				// URLからIDを取得
				setID(props.match.params.id)

				if (id > 0) {
					// Edit
					await axios.get(`movie/${id}`)
						.then((response) => {
							let movie = response.data.movie
							const releaseDate = new Date(movie.release_date)
							movie.release_date = releaseDate.toISOString().split("T")[0]
							setMovie(movie)
							setTitle(movie.title)
							setDescription(movie.description)
							setReleaseDate(movie.release_date)
							setRuntime(movie.runtime)
							setRating(movie.rating)
							setMpaaRating(movie.mpaa_rating)
							setIsLoaded(true)
						})
						.catch((err) => {
							setError(err.message)
						})
				} else {
					// New
					setIsLoaded(true)
				}
			}
		)()
	}, [id])

	const submit = async (e: any) => {
		e.preventDefault()

		const movie: Movie = {
			id: id,
			title: title,
			description: description,
			year: "2021",
			release_date: releaseDate,
			runtime: Number(runtime),
			rating: Number(rating),
			mpaa_rating: mpaaRating,
			genres: []
		}

		// validation
		let localErrors: string[] = []
		if (movie?.title === "") {
			localErrors.push("title")
		}
		if (movie?.release_date === "") {
			localErrors.push("release_date")
		}
		if (movie?.runtime === 0) {
			localErrors.push("runtime")
		}
		if (movie?.rating === 0) {
			localErrors.push("rating")
		}

		setErrors(localErrors)
		if (errors.length > 0) {
			return false
		}

		const config = {
			headers: {
                'Content-Type': 'application/json',
				'Authorization': `Bearer ${props.jwt}`
            }
		}

		await axios.post('admin/editmovie', JSON.stringify(movie), config)
			.then((response) => {
				setAlert({ type: 'alert-success', message: 'Changes saved!' })
				props.history.push({
					pathname: "/admin"
				})
			})
			.catch((err) => {
				setError(err.message)
				setAlert({ type: 'alert-danger', message: err.response.data.error.message })
			})
	}

	const hasError = (key: string) => {
		return errors.indexOf(key) !== -1
	}

	const confirmDelete = (e: SyntheticEvent) => {
		e.preventDefault()

		confirmAlert({
			title: 'Delete Movie?',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						await axios.get(`admin/deletemovie/${id}`)
							.then((response) => {
								props.history.push({
									pathname: "/admin"
								})
							})
							.catch((err) => {
								setError(err.message)
								setAlert({ type: 'alert-danger', message: err.response.data.error.message })
							})
					}
				},
				{
					label: 'No',
					onClick: () => {}
				}
			]
		});
	}

	if (error) {
		// return (
		// 	<div>Error: {error}</div>
		// )
	} else if (!isLoaded) {
		return (
			<p>Loading...</p>
		)
	}

	return (
		<Fragment>
			<h2>Add/Edit Movie</h2>
			<Alert
				alertType={alert.type}
				alertMessage={alert.message}
			/>
			<hr />
			<form method="post" onSubmit={submit}>
				<Input
					title={"Title"}
					className={hasError("title") ? "is-invalid" : ""}
					type={'text'}
					name={'title'}
					value={title}
					handleChange={setTitle}
					errorDiv={hasError("title") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a title"}
				/>
				<Input
					title={"Release Date"}
					className={hasError("release_date") ? "is-invalid" : ""}
					type={'date'}
					name={'release_date'}
					value={releaseDate}
					handleChange={setReleaseDate}
					errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a release_date"}
				/>
				<Input
					title={"Runtime"}
					className={hasError("runtime") ? "is-invalid" : ""}
					type={'text'}
					name={'runtime'}
					value={runtime}
					handleChange={setRuntime}
					errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a runtime"}
				/>
				<Select
					title={'MPAA Rating'}
					name={'mpaa_rating'}
					options={mpaaOptions}
					value={mpaaRating}
					handleChange={setMpaaRating}
					placeholder={'Choose...'}
				/>
				<Input
					title={"Rating"}
					className={hasError("rating") ? "is-invalid" : ""}
					type={'text'}
					name={'rating'}
					value={rating}
					handleChange={setRating}
					errorDiv={hasError("rating") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a rating"}
				/>
				<TextArea
					title={"Description"}
					name={'description'}
					value={description}
					handleChange={setDescription}
					rows={3}
				/>
				<hr />

				<button className="btn btn-primary" type="submit">Save</button>
				<Link to="/admin" className="btn btn-warning ms-1">Cancel</Link>
				{id > 0 && (
					<a
					  href="#!"
					  onClick={confirmDelete}
					  className="btn btn-danger ms-1">
					   Delete
					</a>
				)}
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
)(EditMovie)
