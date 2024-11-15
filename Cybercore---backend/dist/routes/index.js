"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const UsersController_1 = require("../controllers/UsersController");
const ProductsController_1 = require("../controllers/ProductsController");
const CheckToken_1 = require("../middleware/CheckToken");
const multerConfig_1 = require("../configs/multerConfig");
const FavoriteController_1 = require("../controllers/FavoriteController");
const CartController_1 = require("../controllers/CartController");
const UsersAvatarController_1 = require("../controllers/UsersAvatarController");
const UsersControllers = new UsersController_1.UsersController();
const ProductsControllers = new ProductsController_1.ProductsController();
const FavoriteControllers = new FavoriteController_1.FavoriteController();
const CartControllers = new CartController_1.CartController();
router.post("/users/session", UsersControllers.auth); // rota de login
router.post("/users/create", UsersControllers.create); // rota de registro
router.patch("/users/updateImage", multerConfig_1.upload.single("image"), CheckToken_1.CheckToken, UsersAvatarController_1.UsersAvatarController);
router.get("/products/list", CheckToken_1.CheckToken, ProductsControllers.list); // listar todos os produtos
router.get("/products/product/:id", CheckToken_1.CheckToken, ProductsControllers.listUser); // listar produto específico
router.post("/products/create", multerConfig_1.upload.single("image"), CheckToken_1.CheckToken, ProductsControllers.create); // registrar produto
router.delete("/products/delete/:id", CheckToken_1.CheckToken, ProductsControllers.delete); // deletar produto
router.get("/favorites/list", CheckToken_1.CheckToken, FavoriteControllers.getall); // listar favoritos
router.delete("/favorites/deleteFavorite/:id", CheckToken_1.CheckToken, FavoriteControllers.deleteFavorite);
router.post("/favorites/favorite/:id", CheckToken_1.CheckToken, FavoriteControllers.favoriteItem);
router.post("/cart/create/:id", CheckToken_1.CheckToken, CartControllers.create); // adicionar produto ao carrinho
router.get("/cart/list", CheckToken_1.CheckToken, CartControllers.getAll); // listar produtos do carrinho
router.delete("/cart/deleteAll", CheckToken_1.CheckToken, CartControllers.deleteAll); // deletar todos os produtos do carrinho
router.delete("/cart/deleteProductCart/:id", CheckToken_1.CheckToken, CartControllers.deleteProduct); // deletar produto específico do carrinho
