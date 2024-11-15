import express from "express";
const router = express.Router();
import { UsersController } from "../controllers/UsersController";
import { ProductsController } from "../controllers/ProductsController";
import { CheckToken } from "../middleware/CheckToken";
import { upload } from "../configs/multerConfig";
import { FavoriteController } from "../controllers/FavoriteController";
import { CartController } from "../controllers/CartController";
import { UsersAvatarController } from "../controllers/UsersAvatarController";

const UsersControllers = new UsersController();
const ProductsControllers = new ProductsController();
const FavoriteControllers = new FavoriteController();
const CartControllers = new CartController();

router.post("/users/session", UsersControllers.auth); // rota de login
router.post("/users/create", UsersControllers.create); // rota de registro

router.patch(
	"/users/updateImage",
	upload.single("image"),
	CheckToken,
	UsersAvatarController, // Passa a função diretamente
);

router.get("/products/list", CheckToken, ProductsControllers.list); // listar todos os produtos
router.get("/products/product/:id", CheckToken, ProductsControllers.listUser); // listar produto específico
router.post(
	"/products/create",
	upload.single("image"),
	CheckToken,
	ProductsControllers.create,
); // registrar produto
router.delete("/products/delete/:id", CheckToken, ProductsControllers.delete); // deletar produto

router.get("/favorites/list", CheckToken, FavoriteControllers.getall); // listar favoritos
router.delete(
	"/favorites/deleteFavorite/:id",
	CheckToken,
	FavoriteControllers.deleteFavorite,
);

router.post(
	"/favorites/favorite/:id",
	CheckToken,
	FavoriteControllers.favoriteItem,
);

router.post("/cart/create/:id", CheckToken, CartControllers.create); // adicionar produto ao carrinho
router.get("/cart/list", CheckToken, CartControllers.getAll); // listar produtos do carrinho
router.delete("/cart/deleteAll", CheckToken, CartControllers.deleteAll); // deletar todos os produtos do carrinho
router.delete(
	"/cart/deleteProductCart/:id",
	CheckToken,
	CartControllers.deleteProduct,
); // deletar produto específico do carrinho

export { router };
