import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { api } from "../../service/http";
import { useNavigate } from "react-router-dom";

export function CreateProduct() {
	const [image, setImage] = useState<File | null>(null);
	const [preco, setPreco] = useState<string>("");
	const [sobre, setSobre] = useState<string>("");
	const navigate = useNavigate();

	function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
		}
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("preco", preco);
		formData.append("sobre", sobre);

		if (image) {
			formData.append("image", image);
		} else {
			return alert("É necessário declarar uma imagem");
		}

		api
			.post("/products/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(() => {
				alert("Produto criado com sucesso!");
				navigate("/");
			})
			.catch((e) => {
				alert(e);
			});
	}

	return (
		<>
			<section className="w-[100%] h-auto">
				<div className="container px-6 py-12 mx-auto">
					<div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
						<div className="p-4 py-6 rounded-lg dark:bg-gray-800 md:p-8">
							<section className="relative w-[186px] h-[186px] mx-auto mb-8">
								<img
									src={image ? URL.createObjectURL(image) : ""}
									alt="Foto do produto"
									className="w-[11.625rem] h-[11.625rem] rounded-full"
								/>
								<label className="w-[50px] h-[50px] bg-gray-500 rounded-full flex items-center justify-center absolute bottom-[7px] right-[7px] cursor-pointer">
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
							<form>
								<div className="mt-4">
									<label className="block mb-2 text-sm text-gray-600">
										Valor
									</label>
									<input
										type="number"
										placeholder="Declare o valor do produto..."
										onChange={(e) => setPreco(e.target.value)}
										className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-[#1F2937] border-none rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									/>
								</div>

								<div className="w-full mt-4">
									<label className="block mb-2 text-sm text-gray-600">
										Sobre
									</label>
									<textarea
										onChange={(e) => setSobre(e.target.value)}
										className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-[#1F2937] rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 border-none dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										placeholder="Fale sobre o produto..."
									/>
								</div>

								<button
									type="submit"
									onClick={handleSubmit}
									className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#9333EA] rounded-lg hover:bg-[#973deb] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
								>
									Publicar produto
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
