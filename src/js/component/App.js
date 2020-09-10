import React from "react";
import "../../styles/index.scss";
import Form from "./Form";

const App = () => {
	return (
		<div className="App">
			<h1> todos </h1>
			<div className="App-content">
				<Form />
			</div>
		</div>
	);
};

export default App;
