import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../../../../public/images/unsplash_YI_9SivVt_s.png";
import ComputadorImage from "../../../../public/images/configurar.png";
import { Lock, Mail, User } from "lucide-react";
import { Spinner } from "@chakra-ui/react";

function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [spinner, setSpinner] = useState<boolean>(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		setSpinner(true);
		if (name && email && password && confirmPassword) {
			await register({ name, email, password })
				.then(() => {
					navigate("/");
				})
				.catch((error) => {
					alert(error);
					setSpinner(false);
				});
		}
		if (!name || !email || !password || !confirmPassword) {
			setTimeout(() => {
				alert("Favor declarar todos os dados");
				setSpinner(false);
			}, 1000);
		}
	}

	return (
		<>
			<div className="flex w-screen h-screen">
				<section
					className="w-2/3 h-full bg-cover bg-center"
					style={{ backgroundImage: `url(${BackgroundImage})` }}
				/>
				<section className="flex flex-col justify-center items-center w-1/3 h-full p-8">
					<form className="flex flex-col w-full max-w-sm space-y-4">
						<div className="flex justify-center">
							<img
								src={ComputadorImage}
								alt=""
								className="w-[6rem] h-[6rem] mb-5"
							/>
						</div>
						<label className="bg-gray-100 flex rounded-sm w-full relative p-2">
							<User
								className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
								height={19}
							/>
							<input
								type="text"
								onChange={(e) => setName(e.target.value)}
								placeholder="Declare seu nome..."
								className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
							/>
						</label>
						<label className="bg-gray-100 flex rounded-sm w-full relative p-2">
							<Mail
								className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
								height={19}
							/>
							<input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Declare seu e-mail..."
								className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
							/>
						</label>
						<label className="bg-gray-100 flex rounded-sm w-full relative p-2">
							<Lock
								className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
								height={19}
							/>
							<input
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Declare sua senha..."
								className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
							/>
						</label>
						<label className="bg-gray-100 flex rounded-sm w-full relative p-2">
							<Lock
								className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
								height={19}
							/>
							<input
								type="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirme sua senha..."
								className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
							/>
						</label>
						<button
							type="button"
							onClick={handleSubmit}
							className="w-full text-white font-semibold rounded-md h-12 p-2 cursor-pointer bg-purple-600"
						>
							{spinner ? (
								<Spinner
									thickness=".25rem"
									speed="0.65s"
									emptyColor="gray.200"
									color="purple.500"
									size="lg"
								/>
							) : (
								"Criar conta"
							)}
						</button>
						<p className="text-gray-600 font-semibold text-center">
							Já possui uma conta?
							<Link to="/" className="text-purple-800">
								{" "}
								Clique aqui
							</Link>
						</p>
					</form>
				</section>
			</div>
		</>
	);
}

export { SignUp };
