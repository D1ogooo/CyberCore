import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { Lock, Mail } from "lucide-react";
import { Spinner } from "@chakra-ui/react";
import BackgroundImage from "../../../../public/images/unsplash_YI_9SivVt_s.png";
import ComputadorImage from "../../../../public/images/configurar.png";

function SignIn() {
	const { session } = useAuth();
	const navigate = useNavigate();
	const [spinner, setSpinner] = useState<boolean>(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setSpinner(true);

		if (!email || !password) {
			alert("Favor declarar todos os dados");
			setSpinner(false);
			return;
		}

		try {
			await session({ email, password });
			setSpinner(false);
			return navigate("/");
		} catch (e) {
			setSpinner(false);
			console.error("Erro de rede: ", (e as AxiosError).message);
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
							<Mail
								className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
								height={19}
							/>
							<input
								name="email"
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
								"Entrar"
							)}
						</button>
						<p className="text-gray-600 font-semibold text-center">
							Não possui uma conta?
							<Link to="/signup" className="text-purple-800">
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

export { SignIn };
