// components/OneGenre.tsx
import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../models/movie'
import axios from 'axios'

const OneGenre = (props: any) => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")
	const [genreName, setGenreName] = useState("")

	useEffect(() => {
		(
			async () => {
				await axios.get('movies/' + props.match.params.id)
					.then((response) => {
						setMovies(response.data.movies)
						setIsLoaded(true)
						setGenreName(props.location.state.genreName)
					})
					.catch((err) => {
						setError(err.message)
					})
			}
		)()
	}, [])

	if (!movies) {
		setMovies([])
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
			<h2>Genre: {genreName}</h2>
			<div className="list-group">
				{movies.map((m, index) => {
					return (
						<Link to={`/movies/${m.id}`}
							  key={index}
						      className="list-group-item list-group-item-action">
							{m.title}
						</Link>
					)
				})}
			</div>
		</Fragment>
	)
}

export default OneGenre
