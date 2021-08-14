// components/form-components/Select.tsx
const Select = (props: any) => {
	return (
		<div className="mb-3">
			<label htmlFor={props.name} className="form-label">
				{" "}
				{props.title}{" "}
			</label>
			<select
				className="form-select"
				name={props.name}
				value={props.value}
				onChange={e => props.handleChange(e.target.value)}
			>
				<option value="">{props.placeholder}</option>
				{props.options.map((option: any) => {
					return (
						<option
							className="form-select"
							key={option.id}
							value={option.id}
							label={option.value}
						>
							{option.value}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Select
