import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import { TodoServer } from './Components/TodoServer';
import { TaskPage } from './Components/TaskPage';
import { NotFound } from './Components/NotFound';

import './index.css';

export const AppRouter = () => {
	return (
		<Router>
			<div className="container">
				<Routes>
					<Route
						path="/"
						element={<TodoServer />}
					/>
					<Route
						path="/task/:id"
						element={<TaskPage />}
					/>
					<Route
						path="/404"
						element={<NotFound />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</div>
		</Router>
	);
};
