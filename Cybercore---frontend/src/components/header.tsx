import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { CartWidget } from "../components/cart-widghet";
import { Favorite } from "../components/favorite-widghet";
import { Search } from "lucide-react";
import { api } from "../service/http";
import type { DadosCardItemsType } from "../@types/types";

export function Header() {
	const [dadosFavorite, setDadosFavorite] = useState<DadosCardItemsType[]>([]);
	const { loggout, user, cargo } = useAuth();

	const apiImage = import.meta.env.VITE_REACT_APP_API_LOGIN_URL;
	const imagePreview =
		user?.image != null
			? `${apiImage}${user?.image}`
			: "https://via.placeholder.com/54?text=Olá";
	useEffect(() => {
		api
			.get("/products/list")
			.then((res) => {
				setDadosFavorite(res.data);
			})
			.catch((e) => {
				console.error("Erro de rede: ", e.message);
				console.error("Detalhes do erro:", e);
			});
	}, []);

	return (
		<div className="flex items-center justify-evenly color my-5 w-[90%] h-auto mx-auto">
			<div className="flex flex-col items-end">
				<Link to="/" className="text-3xl font-extrabold text-gray-700">
					cybercore
				</Link>
				{cargo === "usuario" ? (
					<p className="text-green-400  text-[1.1rem] font-semibold">{cargo}</p>
				) : (
					<p className="text-red-400  text-[1.1rem] font-semibold">{cargo}</p>
				)}
			</div>

			<form className="flex w-[50%] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
				<Search className="w-5 h-5 text-zinc-500" />
				<input
					placeholder="Buscar produtos..."
					className="flex-1 bg-transparent text-sm outline-0 text-zinc-500 border-none "
				/>
			</form>

			<div className="flex items-center gap-4 text-white">
				<section className="flex items-center">
					{cargo === "usuario" ? (
						<p className="text-red-400  text-[1.1rem] font-semibold">
							<Favorite
								width={30}
								height={30}
								dadosFavorite={{ publicItens: dadosFavorite }}
								id={""}
								productId={""}
								items={""}
								preco={""}
								image={""}
							/>
							<CartWidget
								width={30}
								height={30}
								id={""}
								productId={""}
								items={""}
								preco={""}
								image={""}
								dadosFavorite={{ publicItens: dadosFavorite }}
							/>
						</p>
					) : (
						<Link
							to="/createProduct"
							className="rounded-md bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all text-[1rem] w-[10rem] h-[3.5rem]"
						>
							Novo produto
						</Link>
					)}
				</section>
				<div className="w-[.2px] h-[3rem] bg-zinc-400" />
				<Link to="/profille" className="flex gap-2 items-center">
					<img
						src={imagePreview}
						className="h-[3.8rem] w-[3.8rem] rounded-full"
						width={80}
						height={80}
						alt=""
					/>
					<p className="text-[1.1rem]">
						Bem vindo (a) <br />
						<span className="text-purple-500">{user?.name}</span>
					</p>
				</Link>
			</div>
			<Link
				to="/"
				onClick={() => loggout()}
				className="text-red-500 font-medium"
			>
				Sair
			</Link>
		</div>
	);
}
