// components/Movies.tsx
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { Movie } from '../models/movie'

const Movies = () => {
	// 仮のデータ
	const tmpData = [
		{id: 1, title: "The Shawshank Redemption", runtime: 142},
		{id: 2, title: "Harry Potter", runtime: 175},
		{id: 3, title: "The Dark Kngiht", runtime: 142},
	]

	const [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		(
			() => {
				setMovies(tmpData)
			}
		)()
	}, []) // 空配列を第二引数に渡すとマウント・アンマウント時のみ第１引数の関数を実行

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
