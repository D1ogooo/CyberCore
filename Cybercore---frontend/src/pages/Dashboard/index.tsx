import { useState, useEffect } from "react";
import { Carrosel } from "../../components/carrosel/carrosel";
import { Product } from "../../components/modal";
import { api } from "../../service/http";
import type { ProductInfoType } from "../../@types/types";

function DashBoard() {
  const [data, setData] = useState<ProductInfoType[]>([]);

  useEffect(() => {
    api
      .get("/products/list")
      .then((res) => {
        setData(res.data.publicItens);
      })
      .catch(() => {
        console.error("Error");
        setData([]);
      });
  }, []);

  return (
    <main className="flex flex-col mx-auto w-[90%] gap-8 py-10">
      <section className="w-full mb-5">
        <Carrosel />
      </section>
      <h2 className="text-2xl font-extrabold text-gray-700">Mais vendidos</h2>
      <section className="flex flex-wrap justify-start">
        {data.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </section>
    </main>
  );
}

export { DashBoard };
