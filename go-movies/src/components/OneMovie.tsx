// components/OneMovie.tsx
import { useEffect, useState, Fragment } from 'react'
import { Movie } from '../models/movie'

const OneMovie = (props: any) => {
	const [movie, setMovie] = useState<Movie>({
		id: 0,
		title: "No Movie",
		runtime: 0,
	})

	useEffect(() => {
		(
			() => {
				setMovie({
					id: props.match.id,
					title: "Some movie",
					runtime: 150,
				})
			}
		)()
	}, [])

	return (
		<Fragment>
			<h2>Movie: {movie.title} {movie.id}</h2>
			<table className="table table-compact table-striped">
				<thead></thead>
				<tbody>
					<tr>
						<td><strong>Title:</strong></td>
						<td>{movie.title}</td>
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

export default OneMovie
