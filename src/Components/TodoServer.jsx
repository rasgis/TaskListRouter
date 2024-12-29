import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import styles from './TodoServer.module.css';

const API_URL = 'http://localhost:3001/todos';

export const TodoServer = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		const response = await axios.get(API_URL);
		setTodos(response.data);
	};

	const addTodo = async () => {
		if (!newTodo.trim()) return;
		const newTask = { title: newTodo, completed: false };
		const response = await axios.post(API_URL, newTask);
		setTodos([...todos, response.data]);
		setNewTodo('');
	};

	const handleSearch = debounce((term) => {
		setSearchTerm(term);
	}, 300);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) =>
				a.title.localeCompare(b.title),
			)
		: filteredTodos;

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Список дел JSON-Server</h1>
			<div className={styles.controls}>
				<input
					type="text"
					placeholder="Найти задачу..."
					value={searchTerm}
					onChange={(e) => handleSearch(e.target.value)}
					className={styles.input}
				/>
				<button
					onClick={() => setIsSorted(!isSorted)}
					className={styles.button}
				>
					{isSorted
						? 'По времени добавления'
						: 'Сортировка по алфавиту'}
				</button>
			</div>
			<div className={styles.controls}>
				<input
					type="text"
					placeholder="Добавьте новую задачу..."
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					className={styles.input}
				/>
				<button
					onClick={addTodo}
					className={styles.button}
				>
					Добавить
				</button>
			</div>
			<ul className={styles.list}>
				{sortedTodos.map((todo) => (
					<li
						key={todo.id}
						className={styles.listItem}
					>
						<Link
							to={`/task/${todo.id}`}
							className={styles.todoText}
						>
							{todo.title.length > 30
								? `${todo.title.slice(0, 30)}...`
								: todo.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
