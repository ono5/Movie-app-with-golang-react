// components/form-components/Input.tsx
const Input = (props: any) => {
	return (
		<div className="mb-3">
			<label htmlFor={props.name} className="form-label">
				{props.title}
			</label>
			<input
				type={props.type}
				className={`form-control ${props.className}`}
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={e => props.handleChange(e.target.value)}
			/>
			<div className={props.errorDiv}>{props.errorMsg}</div>
		</div>
	)
}

export default Input
