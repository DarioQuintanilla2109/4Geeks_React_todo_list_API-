import React, { useState } from "react";
import Todo from "./Todo";

const Form = () => {
	//for new todo
	const [todo, setTodo] = useState({});
	//for our previous todos
	const [todos, setTodos] = useState([
		{ todo: "todo 1" },
		{ todo: "todo 2" },
		{ todo: "todo 3" }
	]);

	//captures change event from our input
	const handleChange = e => setTodo({ [e.target.name]: e.target.value });

	const handleClick = e => {
		if (Object.keys(todo).length === 0 || todo.todo.trim() === "") {
			alert("empty list");
			return;
		}
		setTodos([...todos, todo]);
	};

	const deleteTodo = indice => {
		const newTodos = [...todos];
		newTodos.splice(indice, 1);
		setTodos(newTodos);
	};

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<h1> todos </h1>
				<br />
				<input type="text" name="todo" onChange={handleChange} />
				<button onClick={handleClick}>save</button>
			</form>

			{todos.map((value, index) => (
				<Todo
					todo={value.todo}
					key={index}
					index={index}
					deleteTodo={deleteTodo}
				/>
			))}
		</>
	);
};

export default Form;
