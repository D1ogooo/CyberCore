import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profille() {
	const apiImage = import.meta.env.VITE_REACT_APP_API_LOGIN_URL;
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [image, setImage] = useState<File | null >(null);
	const { user, handleChangeImage } = useAuth();
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(true)
	const [avatar, setAvatar] = useState(user?.image ? user.image : "https://via.placeholder.com/54?text=Olá")

	useEffect(() => {
		const checkUser = () => {
		 setLoading(false);
		};
	 checkUser();
	}, []);
	
		if (loading) {
			return (
				<div className="flex items-center justify-center h-screen">
					<Spinner size="xl" />
				</div>
			);
		}

	function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const imagePreview = URL.createObjectURL(file)
			setAvatar(imagePreview)
		}
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		const verifyPassword = password !== confirmPassword;
		if (verifyPassword) {
			return alert("Error: As senhas declaradas precisam ser iguais.");
		}
	
		if (!image) {
			return alert("Error: Imagem não declarada");
		}
	
		const formData = {
			image: image,
			email,
			password,
		};
	
		handleChangeImage({ formData })
			.then(() => {
				alert("💡 Imagem adicionada com sucesso!");
				navigate(0)
			})
			.catch(() => {
				alert('Error')
			});
	}

	return (
		<div className="flex items-center justify-center my-[10rem]">
			<section className="w-[30%] h-[60vh] flex items-center justify-center rounded-sm">
				<form className=" flex flex-col gap-3 items-center p-2 text-white">
					<section className="relative w-[186px] h-[186px] mx-auto mb-8">
						{user?.image === null ?
						<img
						src={`${avatar}`}
							alt="Foto do usuário"
							className="w-[186px] h-[186px] rounded-full"
						/> :
						<img
							src={`${apiImage}${avatar}`}
							alt="Foto do usuário"
							className="w-[186px] h-[186px] rounded-full"
						/>}
						<label
							htmlFor="avatar"
							className="w-[38px] h-[38px] bg-gray-500 rounded-full flex items-center justify-center absolute bottom-[7px] right-[7px] cursor-pointer"
						>
							<FiCamera className="w-5 h-5 text-gray-800" />
							<input
								onChange={handleImage}
								id="avatar"
								type="file"
								accept="image/*"
								className="hidden"
							/>
						</label>
					</section>

					<label className="bg-gray-800 flex rounded-sm flex-1 relative p-2 min-w-[20rem]">
						<Mail
							className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
							height={19}
						/>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Declare seu email..."
							className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
						/>
					</label>
					
					<label className="bg-gray-800 flex rounded-sm flex-1 relative p-2 min-w-[20rem]">
						<Lock
							className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
							height={19}
						/>
						<input
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Declare sua senha..."
							className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
						/>
					</label>

					<label className="bg-gray-800 flex rounded-sm flex-1 relative p-2 min-w-[20rem]">
						<Lock
							className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
							height={19}
						/>
						<input
							onChange={(e) => setConfirmPassword(e.target.value)}
							type="password"
							placeholder="Confirme sua senha..."
							className="w-full pl-10 border-none bg-transparent outline-none focus:outline-none focus:ring-0"
						/>
					</label>
					<button
						disabled={password.length < 1 || confirmPassword.length < 1}
						type="button"
						onClick={handleSubmit}
						className="w-full text-white font-semibold rounded-md h-12 p-2 cursor-pointer bg-purple-600"
					>
						Confirmar
					</button>
				</form>
			</section>
		</div>
	);
}

export { Profille };
