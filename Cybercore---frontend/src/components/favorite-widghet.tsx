import { useState, useEffect } from "react";
import type { CartWidgetType, DadosCardItemsType } from "../@types/types";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { LucideHeart } from "lucide-react";
import { FavoriteItems } from "./favoriteitems";
import { api } from "../service/http";

export function Favorite({
  width = 2,
  height = 2,
  ...rest
}: CartWidgetType) {
  const [data, setData] = useState<DadosCardItemsType[]>([]);

  useEffect(() => {
    api
      .get("/favorites/list")
      .then((res) => {
        const productsData = res.data.favorites.map(
          (favorite: any) => {
            const product = favorite.product;
            return {
              id: product.id,
              productId: product.productId,
              items: product.sobre,
              preco: product.preco,
              imagem: product.imagem,
              key: product.id,
            };
          }
        );
        setData(productsData);
      })
      .catch((e) => {
        console.error("Erro de rede: ", e.message);
        console.error("Detalhes do erro:", e);
      });
  }, []);

  return (
    <Menu>
      <MenuButton px={4} py={2} transition="all 0.2s" borderRadius="md">
        <LucideHeart {...rest} width={width} height={height} />
      </MenuButton>
      <MenuList className="w-[28rem] h-[30rem] overflow-y-auto">
        {data.length === 0 ? (
          <div className="p-4">Nenhum item favoritado.</div>
        ) : (
          data.map((product: DadosCardItemsType) => (
            <FavoriteItems
              key={product.id}
              id={product.id}
              productId={product.id}
              items={product.items}
              preco={product.preco}
              image={product.imagem}
              imagem={""}
              publicItens={[]}
            />
          ))
        )}
        <div className="flex items-center justify-between pl-4 pr-4 pb-1 pt-4" />
      </MenuList>
    </Menu>
  );
}
