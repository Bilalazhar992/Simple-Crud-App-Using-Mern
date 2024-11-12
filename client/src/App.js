import { Route, Routes, Navigate } from "react-router-dom";
import Get from "./components/GetProduct/get"
import AddProduct from "./components/AddProduct/add"
import EditProduct from "./components/EditProduct/Edit";
import Signup from "./components/SignUp";
import Login from "./components/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Get />} />}
			{user && <Route path="/add" exact element={<AddProduct />} />}
			{user && <Route path="/edit/:id" exact element={<EditProduct />} />}
			<Route path="/register" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;