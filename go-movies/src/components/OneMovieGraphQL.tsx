// components/OneMovieGraphQL.tsx
import { useEffect, useState, Fragment } from 'react'
import { Movie } from '../models/movie'
import axios from 'axios'

const OneMovieGraphQL = (props: any) => {
	const [movie, setMovie] = useState<Movie>({
		id: 0, title: '', description: '', year: "2021",
		release_date: '', runtime: 0, rating: 0,
		mpaa_rating: '', genres: [], poster: '',
	})
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		const payload = `
			{
				movie(id: ${props.match.params.id}) {
					id
					title
					runtime
					year
					description
					release_date
					rating
					mpaa_rating
					poster
				}
			}
		`
		graphQLRequest(payload)

	}, [])

	const graphQLRequest = async (payload: string) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		await axios.post('graphql', payload, config)
			.then((response) => {
				setMovie(response.data.data.movie)
				setIsLoaded(true)
			})
			.catch((err) => {
				setError(err.message)
			})
	}

	// mapを使えるようにするために配列にする
	if (movie.genres) {
		movie.genres = Object.values(movie.genres)
	} else {
		movie.genres = []
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
			<h2>Movie: {movie.title} ({movie.year})</h2>

			{movie.poster !== "" && (
				<div>
					<img src={`http://image.tmdb.org/t/p/w200${movie.poster}`} alt="poster" />
				</div>
			)}

			<div className="float-start">
				<small>Raging: {movie.mpaa_rating}</small>
			</div>
			<div className="float-end">
				{movie.genres.map((m, index) => (
					<span
					  key={index}
					  className="badge bg-secondary me-1">
						{m}
					</span>
				))}
			</div>
			<div className="clearfix"></div>
			<hr />

			<table className="table table-compact table-striped">
				<thead></thead>
				<tbody>
					<tr>
						<td><strong>Title:</strong></td>
						<td>{movie.title}</td>
					</tr>
					<tr>
						<td><strong>Description: </strong></td>
						<td>{movie.description}</td>
					</tr>
					<tr>
						<td><strong>Run Time:</strong></td>
						<td>{movie.runtime} minutes</td>
					</tr>
				</tbody>
			</table>
		</Fragment>
	)
}

export default OneMovieGraphQL
