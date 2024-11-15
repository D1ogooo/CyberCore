import type { DadosCardItemsType } from "../@types/types";
import { Counter } from "./contador";

export function CardItems({ items, preco, image }: DadosCardItemsType) {
	return (
		<>
			<div className="p-5 flex mx-auto items-center">
				<div className="w-[50%] h-auto pr-2">
					<img src={image} alt="" className="w-[90%] h-auto" />
				</div>
				<div className="w-[50%]">
					<h3 className="text-cinzaClaro ">{items}</h3>
					<p className="text-cinzaClaro pt-2 font-medium">{preco}</p>
					<Counter items={items}/>
				</div>
			</div>
			<hr />
		</>
	);
}
