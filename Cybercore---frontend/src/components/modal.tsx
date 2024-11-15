import { useAuth } from "../hooks/useAuth";
import { Heart, Pencil, ShoppingBasket } from "lucide-react";
import type { HandleSubmitId, ProductProps } from "../@types/types";
import { Link } from "react-router-dom";
import { api } from "../service/http";

export function Product({ item }: ProductProps) {
	const { cargo } = useAuth();
	const apiImage = import.meta.env.VITE_REACT_APP_API_LOGIN_URL;
	
	async function handleSubmit({ productId }: HandleSubmitId) {
		await api
			.post(`/cart/create/${productId}`)
			.then(() => {
				window.location.reload();
				alert("🛒 Produto adicionado ao carrinho com sucesso!");
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function handleSubmitFavorite({ productId }: HandleSubmitId) {
		api
			.post(`/favorites/favorite/${productId}`)
			.then(() => {
				window.location.reload();
				alert("🩷 Produto favoritado com sucesso!");
			})
			.catch((e) => {
				console.log(e);
			});
	}

	return (
		<>
			{cargo === "admin" ? (
				<div className="pr-[-1.25rem] pl-[1.25rem]">
					<Link
						to={`/productDetail/${item.id}`}
						className="flex flex-col h-auto w-[17rem] gap-[.5rem] border-hrColor p-0 mt-5 cursor-pointer"
					>
						<button
							type="button"
							className="z-50"
							onClick={(e) => e.stopPropagation()}
						>
							<Pencil height={36} width={36} color={"#dfdeded1"} />
						</button>
						<img
							src={`${apiImage}${item.imagem}`}
							
							alt={item.sobre}
							className="flex w-[9.5rem] h-[9.5rem] justify-center items-center mx-auto flex-shrink-0"
						/>
						<h3 className="text-cinzaClaro text-left font-medium">
							{item.sobre}
						</h3>
						<p className="text-cinzaEscuro w-full mx-auto">{item.preco}</p>
					</Link>
				</div>
			) : (
				<div className="pr-[-1.25rem] pl-[1.25rem]">
					<div className="flex flex-col h-auto w-[17rem] gap-[.5rem] border-hrColor p-0 mt-5 cursor-pointer">
						<div className="flex justify-between m-1 p-1 gap-2">
							<button
								type="button"
								className="z-50"
								onClick={() => handleSubmit({ productId: item.id })}
							>
								<ShoppingBasket
									height={36}
									width={36}
									className=" bg-cinzaClaro cursor-pointer p-[5px] rounded-[1.25rem]"
									color="#fff"
								/>
							</button>

							<button
								type="button"
								onClick={() => handleSubmitFavorite({ productId: item.id })}
							>
								<Heart
									height={36}
									width={36}
									className="bg-cinzaClaro cursor-pointer p-[5px] rounded-[1.25rem]"
									color="#fff"
								/>
							</button>
						</div>
						<img
							src={`${apiImage}${item.imagem}`}
							alt={item.sobre}
							className="flex w-[9.5rem] h-[9.5rem] justify-center items-center mx-auto flex-shrink-0"
						/>
						<h3 className="text-cinzaClaro text-left font-medium">
							{item.sobre}
						</h3>
						<p className="text-cinzaEscuro w-full mx-auto">{item.preco}</p>
					</div>
				</div>
			)}
		</>
	);
}
