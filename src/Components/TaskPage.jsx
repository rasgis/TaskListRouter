import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './TaskPage.module.css';

const API_URL = 'http://localhost:3001/todos';

export const TaskPage = () => {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${API_URL}/${id}`)
			.then((response) => setTask(response.data));
	}, [id]);

	const handleDelete = async () => {
		await axios.delete(`${API_URL}/${id}`);
		navigate('/');
	};

	const handleUpdate = async () => {
		await axios.patch(`${API_URL}/${id}`, { title: task.title });
		navigate('/');
	};

	if (!task) return <div>Загрузка...</div>;

	return (
		<div className={style.taskDetails}>
			<button
				className={style.backButton}
				onClick={() => navigate(-1)}
			>
				Назад
			</button>
			<h1>Задача</h1>
			<textarea
				className={style.textarea}
				value={task.title}
				onChange={(e) =>
					setTask({ ...task, title: e.target.value })
				}
			/>
			<button
				className={style.saveButton}
				onClick={handleUpdate}
			>
				Сохранить
			</button>
			<button
				className={style.deleteButton}
				onClick={handleDelete}
			>
				Удалить
			</button>
		</div>
	);
};
