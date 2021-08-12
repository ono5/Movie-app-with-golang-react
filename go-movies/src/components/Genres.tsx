// components/Genres.tsx
import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Genre } from '../models/movie'

const Genres = (props: any) => {
	const [genres, setGenres] = useState<Genre[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		(
			async () => {
				await axios.get('genres')
					.then((response) => {
						setGenres(response.data.genres)
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
			<h2>Genres</h2>
			<div className="list-group">
				{genres.map((m) => {
					return (
						<Link
							key={m.id}
							className="list-group-item list-group-item-action"
							to={{
							pathname: `/genre/${m.id}`,
							state: {genreName: m.genre_name},
						}}>
							{m.genre_name}
						</Link>
					)
				})}
			</div>
		</Fragment>
	)
}

export default Genres
