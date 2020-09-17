import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
	//for new todo
	const [todo, setTodo] = useState({});
	//for our previous todos
	const [todos, setTodos] = useState([
		// { todo: "todo 1" },
	]);

	//captures change event from our input, and updates our state for single todo
	const handleChange = e => setTodo({ [e.target.name]: e.target.value });

	//checks for empty todo
	//adds to list
	const handleClick = e => {
		if (Object.keys(todo).length === 0 || todo.todo.trim() === "") {
			alert("empty list");
			return;
		}
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + todo, {
			method: "POST",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
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
				<input type="text" name="todo" onChange={handleChange} />
				<button onClick={handleClick}>save</button>
			</form>
			<button id="clear-all" onClick={deleteAll}>
				clear all
			</button>

			{todos.map((value, index) => (
				<Todo
					todo={value.todo}
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
