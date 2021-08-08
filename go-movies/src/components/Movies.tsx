// components/Movies.tsx
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { Movie } from '../models/movie'
import axios from 'axios'

const Movies = () => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")


	useEffect(() => {
		(
			async () => {
				await axios.get('movies')
					.then((response) => {
						setMovies(response.data.movies)
						setIsLoaded(true)
					})
					.catch((err) => {
						setError(err.message)
					})
			}
		)()
	}, [])

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
			<h2>Choose a movie</h2>
			<ul>
				{movies.map((m) => {
					return (
						<li key={m.id}>
							<Link to={`/movies/${m.id}`}>{m.title}</Link>
						</li>
					)
				})}
			</ul>
		</Fragment>
	)
}

export default Movies
