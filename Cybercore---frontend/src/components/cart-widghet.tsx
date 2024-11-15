import { useEffect, useState } from "react";
import type { CartItemType, CartType, CartWidgetType } from "../@types/types";
import { api } from "../service/http";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { Counter } from "./contador";

export function CartWidget({ width = 2, height = 2, ...rest }: CartWidgetType) {
	const [data, setData] = useState<CartType[]>([]);
	const [cartLength, setCartLength] = useState<boolean>(false);
	const apiImage = import.meta.env.VITE_REACT_APP_API_LOGIN_URL;

	useEffect(() => {
		api
			.get("/cart/list")
			.then((res) => {
				setData(res.data.allProductsCart || []);
				setCartLength(res.data.allProductsCart.length > 0);
			})
			.catch(() => {
				console.error("Erro de rede: ");
			});
	}, []);

	function handleCleanCart(): void {
		api
			.delete("/cart/deleteAll")
			.then(() => {
				window.location.reload();
			})
			.catch(() => {
				console.error("Erro de rede");
			});
	}

	return (
		<Menu>
			<MenuButton px={4} py={2} transition="all 0.2s" borderRadius="md">
				<ShoppingBasket
					color={"#fff"}
					{...rest}
					width={width}
					height={height}
				/>
			</MenuButton>
			<MenuList className="w-[28rem] h-[30rem] overflow-y-auto">
				{data.length ? (
					data.map((cart) => (
						<div key={cart.id} className="p-5">
							{cart.items.length ? (
								cart.items.map((item: CartItemType) => (
									<div key={item.id} className="flex mx-auto items-center py-2">
										<div className="w-[50%] h-auto pr-2">
											<img
												src={`${apiImage}${item.product.imagem}`}
												alt={item.product.sobre}
												className="w-[90%] h-auto"
											/>
										</div>
										<div className="w-[50%]">
											<h4 className="text-cinzaClaro">{item.product.sobre}</h4>
											<p className="text-cinzaClaro pt-2 font-medium">
												{item.product.preco}
											</p>
											<Counter items={item.id} />
										</div>
									</div>
								))
							) : (
								<p>Carrinho vazio</p>
							)}
							<div className="flex items-center justify-between pl-4 pr-4 pb-1 pt-4">
								<button
									type="button"
									className="font-bold text-cinzaClaro flex gap-1"
									onClick={() => handleCleanCart()}
								>
									<Trash2 />
									Esvaziar carrinho
								</button>
								<button
									type="button"
									className="font-bold text-cinzaClaro flex"
									disabled={cartLength}
								>
									Realizar compra
								</button>
							</div>
						</div>
					))
				) : (
					<p>Carrinho vazio</p>
				)}
			</MenuList>
		</Menu>
	);
}
