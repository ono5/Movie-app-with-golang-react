// components/Admin.tsx
import { Dispatch, Fragment, useEffect, useState } from "react"
import { connect } from 'react-redux'
import { setJWTAction } from '../redux/actions/setJWTAction'
import { Movie } from '../models/movie'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Admin = (props: any) => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (props.jwt === "") {
			props.history.push({
				pathname: "/login"
			})
			return
		}

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

export default connect( (state: {jwt: string}) => ({
	jwt: state.jwt
}),
(dispatch: Dispatch<any>) => ({
	setJWT: (jwt: string) => dispatch(setJWTAction(jwt))
})
)(Admin)
