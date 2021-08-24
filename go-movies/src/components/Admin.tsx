// components/Admin.tsx
import { Fragment, useEffect, useState } from "react"
import { Movie } from '../models/movie'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {
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
			<h2>Manage Catalogue</h2>
			<hr />
			<div className="list-group">
				{movies.map((m) => {
					return (
						<Link
						  key={m.id}
						  to={`/admin/movie/${m.id}`}
						  className="list-group-item list-group-item-action"
						>
							{m.title}
						</Link>
					)
				})}
			</div>
		</Fragment>
	)
}

export default Admin
