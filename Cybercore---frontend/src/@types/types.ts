import type { ReactNode } from "react";

export interface DataType {
	imagem: string;
	sobre: string;
	preco: string;
	id: string;
}

export interface ProductProps {
	item: ProductInfoType;
}

export interface HandleSubmitId {
	productId: string;
}

export interface AuthData {
	user?: {
		id: string;
		name: string;
		image: string | null;
	};
	token?: string;
}

export interface FormDataType {
	formData: {
		image: string | File;
		email: string;
		password: string;
	};
}

export interface ContextType extends Pick<AuthData, "user"> {
	loggout: () => void;
	session: (data: LoginType) => Promise<void>;
	register: (data: RegisterType) => Promise<void>;
	handleChangeImage: (data: FormDataType) => Promise<void>;
	cargo: "usuario" | "admin" | undefined;
	formData?: FormDataType;
}

export interface ProductType {
	info: DataType;
	productId: string;
	imagem: string;
	sobre: string;
	preco: string;
}

export interface DadosCardItemsType {
	id: string;
	productId: string;
	items: string;
	preco: string;
	imagem: string;
	image: string;
	key: string;
	publicItens: DadosCardItemsType[];
}

export interface ProductDetailtype {
	imagem: string;
	sobre: string;
	preco: string;
}

export interface AuthProviderType {
	children: ReactNode;
}

export interface FavoriteProviderType {
	children: ReactNode;
}

export interface CartWidgetType {
	id: string;
	productId: string;
	items: string;
	preco: string;
	image: string;
	width?: number;
	height?: number;
	dadosFavorite: {
		publicItens: DadosCardItemsType[];
	};
}

export interface CartItemType {
	id: string;
	product: ProductType;
}

export interface ProductInfoType {
	id: string;
	item: DataType;
	productId: string;
	preco: string;
	sobre: string;
	imagem: string;
}

export interface CartType {
	id: string;
	items: CartItemType[];
}

export interface FavoriteType {
	id: string;
	userId: string;
	product: DadosCardItemsType[];
	productId: string;
	createdAt?: Date;
	sobre: string;
	preco: string;
	imagem: string;
}

export interface LoginType {
	email: string;
	password: string;
}

export interface DeleteItemType {
	id: string;
}

export interface RegisterType {
	name: string;
	email: string;
	password: string;
}

export interface DecodedTokenType {
	role: "usuario" | "admin" | undefined;
}
