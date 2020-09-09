import React from "react";

const Todo = ({ todo, index, deleteTodo }) => {
	return (
		<>
			<h3>{todo}</h3>
			<button className="btn-delete" onClick={() => deleteTodo(index)}>
				x
			</button>
		</>
	);
};

export default Todo;
