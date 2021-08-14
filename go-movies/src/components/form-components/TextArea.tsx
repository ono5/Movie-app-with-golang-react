// components/form-components/TextArea.tsx
const TextArea = (props: any) => {
	return (
		<div className="mb-3">
			<label htmlFor={props.name} className="form-label">
				{props.title}
			</label>
			<textarea
				className="form-control"
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={e => props.handleChange(e.target.value)}
				rows={props.rows}
			/>
		</div>
	)
}

export default TextArea

