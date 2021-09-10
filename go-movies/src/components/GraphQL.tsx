// components/GraphQL.tsx
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../models/movie'
import axios from 'axios'
import Input from './form-components/Input'

const GraphQL = (props: any) => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState("")
	const [searchTerm, setSearchTerm] = useState("")

	const performList = () => {
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
		graphQLRequest(payload, "list")
	}

	const performSearch = () => {
		const payload = `
			{
				search(titleContains: "${searchTerm}") {
					id
					title
					runtime
					year
					description
				}
			}
		`
		graphQLRequest(payload, "search")
	}

	useEffect(() => {
		(
			() => {
				if (searchTerm === "") {
					performList()
				} else {
					performSearch()
				}
			}
		)()
	}, [searchTerm])

	const graphQLRequest = async (payload: string, type: string) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		await axios.post('graphql', payload, config)
			.then((response) => {
				let theList
				switch (type) {
					case 'list':
						theList = response.data.data.list
						break
					case 'search':
						theList = response.data.data.search
						break
				}

				if (theList.length) {
					setMovies(theList)
				} else {
					setMovies([])
				}
				setIsLoaded(true)
			})
			.catch((err) => {
				setError(err.message)
			})
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
			<h2>GraphQL</h2>
			<hr />
			<Input
				title={"Search"}
				type={"text"}
				name={"search"}
				value={searchTerm}
				handleChange={setSearchTerm}
			/>
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
