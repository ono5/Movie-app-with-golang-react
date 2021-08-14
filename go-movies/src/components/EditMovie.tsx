// components/EditMovie.tsx
import { SyntheticEvent, Fragment, useEffect, useState } from "react"
import { Movie } from '../models/movie'
import Input from './form-components/Input'
import TextArea from './form-components/TextArea'
import Select from './form-components/Select'
import './EditMovie.css'

const EditMovie = (props: any) => {
	const [movie, setMovie] = useState<Movie>()
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")

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
				// setMovie(sampleData)
			}
		)()
	}, [])

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		const sampleData: Movie = {
			id: id,
			title: title,
			description: description,
			release_date: releaseDate,
			year: 0,
			runtime: runtime,
			rating: rating,
			mpaa_rating: mpaaRating,
			genres: []
		}

		console.log(sampleData)
	}

	return (
		<Fragment>
			<h2>Add/Edit Movie</h2>
			<hr />
			<form method="post" onSubmit={submit}>
				<Input
					title={"Title"}
					type={'text'}
					name={'title'}
					value={movie?.title}
					handleChange={setTitle}
				/>
				<Input
					title={"Release Date"}
					type={'date'}
					name={'release_date'}
					value={movie?.release_date}
					handleChange={setReleaseDate}
				/>
				<Input
					title={"Runtime"}
					type={'text'}
					name={'runtime'}
					value={movie?.runtime}
					handleChange={setRuntime}
				/>
				<Select
					title={'MPAA Rating'}
					name={'mpaa_rating'}
					options={mpaaOptions}
					values={movie?.mpaa_rating}
					handleChange={setMpaaRating}
					placeholder={'Choose...'}
				/>
				<Input
					title={"Rating"}
					type={'text'}
					name={'rating'}
					value={movie?.rating}
					handleChange={setRating}
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
