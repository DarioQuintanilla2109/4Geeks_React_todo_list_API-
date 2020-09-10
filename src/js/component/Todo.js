import React from "react";

//props that we are passing in
// need to pass in index to know which todo to delete
const Todo = ({ todo, index, deleteTodo }) => {
	//return h3 first
	return (
		<div className="todo">
			<h5>{todo}</h5>
			<button className="btn-delete" onClick={() => deleteTodo(index)}>
				x
			</button>
		</div>
	);
};

export default Todo;
