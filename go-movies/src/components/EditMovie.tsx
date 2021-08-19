// components/EditMovie.tsx
import { Fragment, useEffect, useState } from "react"
import { Movie } from '../models/movie'
import Input from './form-components/Input'
import TextArea from './form-components/TextArea'
import Select from './form-components/Select'
import './EditMovie.css'
import axios from 'axios'

const EditMovie = (props: any) => {
	const [movie, setMovie] = useState<Movie>()
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")
	const [errors, setErrors] = useState<string[]>([])

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
			runtime: runtime,
			rating: rating,
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

		// Errorセット
		setErrors(localErrors)
		if (errors.length > 0) {
			return false
		}

		await axios.post('admin/editmovie', JSON.stringify(movie))
			.then((response) => {
				console.log({response})
			})
			.catch((err) => {
				setError(err.message)
			})
	}

	const hasError = (key: string) => {
		return errors.indexOf(key) !== -1
	}

	if (error) {
		return (
			<div>Error: {error}</div>
		)
	} else if (!isLoaded) {
		return (
			<p>Loading...</p>
		)
	}

	return (
		<Fragment>
			<h2>Add/Edit Movie</h2>
			<hr />
			<form method="post" onSubmit={submit}>
				<Input
					title={"Title"}
					className={hasError("title") ? "is-invalid" : ""}
					type={'text'}
					name={'title'}
					value={movie?.title}
					handleChange={setTitle}
					errorDiv={hasError("title") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a title"}
				/>
				<Input
					title={"Release Date"}
					className={hasError("release_date") ? "is-invalid" : ""}
					type={'date'}
					name={'release_date'}
					value={movie?.release_date}
					handleChange={setReleaseDate}
					errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a release_date"}
				/>
				<Input
					title={"Runtime"}
					className={hasError("runtime") ? "is-invalid" : ""}
					type={'text'}
					name={'runtime'}
					value={movie?.runtime}
					handleChange={setRuntime}
					errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a runtime"}
				/>
				<Select
					title={'MPAA Rating'}
					name={'mpaa_rating'}
					options={mpaaOptions}
					value={movie?.mpaa_rating}
					handleChange={setMpaaRating}
					placeholder={'Choose...'}
				/>
				<Input
					title={"Rating"}
					className={hasError("rating") ? "is-invalid" : ""}
					type={'text'}
					name={'rating'}
					value={movie?.rating}
					handleChange={setRating}
					errorDiv={hasError("rating") ? "text-danger" : "d-none"}
					errorMsg={"Please enter a rating"}
				/>
				<TextArea
					title={"Description"}
					name={'description'}
					value={movie?.description}
					handleChange={setDescription}
					rows={3}
				/>
				<hr />

				<button className="btn btn-primary" type="submit">Save</button>
			</form>
		</Fragment>
	)
}

export default EditMovie
