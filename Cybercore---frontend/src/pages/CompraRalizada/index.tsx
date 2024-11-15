import leftImage from "../../../public/images/paymentfull.jpg";
import {
  Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/table";

export function CompraRealizada() {
	return (
		<>
			<div className="w-[85%] mx-auto">
  <div className="flex flex-wrap justify-center w-full gap-[2rem] mt-[10rem]">
    <section className="my-10 mx-auto w-full md:w-[50%]">
      <TableContainer>
        <Table variant="simple" className="text-center mx-center">
          <TableCaption>✔️ Compra realizada com sucesso</TableCaption>
          <Thead>
            <Tr>
              <Th>Usuário</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Diogo maçal costa</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </section>
    <section className="w-full md:w-[20%] h-auto">
      <img src={leftImage} className="w-full h-auto rounded-xl" alt="" />
    </section>
  </div>
</div>
		</>
	);
}
