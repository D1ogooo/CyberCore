import { useState } from "react";
import { Trash2 } from "lucide-react";
import { api } from "../service/http";
import IncrementIcon from "../../public/images/IncrementIcon.svg";
import DecrementIcon from "../../public/images/DecrementIcon.svg";

export function Counter({ items }: { items: string}) {
	const [state, setState] = useState<number>(0);

	function handleIncrement() {
		setState(state + 1);
	}

	function handleDecrement() {
		if (state === 1 || state === 0) {
			return;
		}
		setState(state - 1);
	}

	function deleteItemCart(id: string): void {
		api.delete(`/cart/deleteProductCart/${id}`)
			.then(() => {
				window.location.reload();
				alert("🛒 Produto deletado do carrinho com sucesso!");
			})
			.catch(() => {
				console.log({ "error": "erro ao deletar item" });
			});
	}

	return (
		<>
			<div className="flex justify-start gap-5 items-center w-[100%] pr-2">
				<button type='button' onClick={handleIncrement}>
					<img src={IncrementIcon} alt="" className="cursor-pointer" />
				</button>
				<p className="text-baseTitle text-center text-base font-normal leading-[130%] pl-2 pr-2">
					{state}
				</p>
				<button type='button' onClick={handleDecrement}>
					<img src={DecrementIcon} alt="" className="cursor-pointer" />
				</button>
				<button
					type="button"
					className="flex p-[0.5rem] justify-center items-center gap-[0.5rem] ml-[0.5rem] w-[2.375rem] h-[2.375rem] rounded-[0.375rem] border-none bg-pupleDark cursor-pointer"
					onClick={() => deleteItemCart(items)}
				>
					<Trash2 height={22} />
				</button>
			</div>
		</>
	);
}
