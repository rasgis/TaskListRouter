import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<h1 className={styles.notFoundHeading}>
				404 - Page Not Found
			</h1>
			<Link
				className={styles.notFoundLink}
				to="/"
			>
				На главную
			</Link>
		</div>
	);
};
