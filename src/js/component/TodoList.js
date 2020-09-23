import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
	//for new todo
	const [todo, setTodo] = useState("");
	//for our previous todos
	const [todos, setTodos] = useState([
		// { todo: "todo 1" },
	]);

	//captures change event from our input, and updates our state for single todo
	const handleChange = e => setTodo(e.target.value);

	//checks for empty todo
	//adds to list
	const handleClick = e => {
		// if (Object.keys(todo).length === 0 || todo.todo.trim() === "") {
		// 	alert("empty list");
		// 	return;
		// }
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/darioQuintanilla",
			{
				method: "PUT",
				body: JSON.stringify([
					...todos,
					{
						label: todo,
						done: false
					}
				]),
				headers: new Headers({
					"Content-Type": "application/json"
				})
			}
		)
			.then(resp => {
				if (resp.ok) {
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/darioQuintanilla"
					)
						.then(secondRespone => secondRespone.json())
						.then(data => {
							setTodos(data);
							setTodo("");
						});
				} else {
					alert("Somehing went worng" + resp.status);
				}
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
		//setTodos([...todos, todo]);
	};

	const deleteTodo = indice => {
		const newTodos = [...todos];
		//splicing
		newTodos.splice(indice, 1);
		//returns array with deleted todo
		setTodos(newTodos);
	};

	//deletes all of the todos
	const deleteAll = indice => {
		const newTodos = [...todos];
		//splicing now all of the todos
		newTodos.splice(indice, newTodos.length);
		//returns array with deleted todo
		setTodos(newTodos);
	};

	//name on input line 37 same as key for our objects
	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<br />
				<input
					type="text"
					name="todo"
					onChange={handleChange}
					value={todo}
				/>
				<button onClick={handleClick}>save</button>
			</form>
			<button id="clear-all" onClick={deleteAll}>
				clear all
			</button>

			{todos.map((value, index) => (
				<Todo
					todo={value.label}
					key={index}
					index={index}
					deleteTodo={deleteTodo}
				/>
			))}

			<div className="items-left">{todos.length} item left</div>
		</>
	);
};

export default TodoList;
