// components/ui-components/Alert.tsx
const Alert = (props: any) => {
	return (
		<div className={`alert ${props.alertType}`} role="alert">
  			{props.alertMessage}
		</div>
	)
}

export default Alert
