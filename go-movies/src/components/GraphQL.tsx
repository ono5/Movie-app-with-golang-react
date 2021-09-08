// components/GraphQL.tsx
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../models/movie'
import axios from 'axios'

const GraphQL = (props: any) => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		(
			async () => {
				const payload = `
					{
						list {
							id
							title
							runtime
							year
							description
						}
					}
				`
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}
				await axios.post('graphql/list', payload, config)
					.then((response) => {
						setMovies(response.data.data.list)
						setIsLoaded(true)
					})
					.catch((err) => {
						setError(err.message)
					})
			}
		)()
	}, [])
	console.log({movies})

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
			<h2>GraphQL</h2>
			<div className="list-group">
				{movies.map((m) => {
					return (
						<Link
						  key={m.id}
						  to={`/movies/${m.id}`}
						  className="list-group-item list-group-item-action"
						>
							<strong>{m.title}</strong>
						</Link>
					)
				})}
			</div>
		</Fragment>
	)
}

export default GraphQL
