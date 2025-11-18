import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 fw-bold text-white">Contact List</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-secondary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};