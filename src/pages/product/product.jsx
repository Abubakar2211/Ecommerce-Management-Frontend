import { ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import LinkButton from "../../utils/LinkButton";
import Table from "../../utils/Table/Table";
import Thead from "../../utils/Table/Thead";
import Tbody from "../../utils/Table/TBody";
import Tr from "../../utils/Table/Tr";
import Td from "../../utils/Table/Td";
import I from "../../utils/I";

export default function Product() {
  const columns = ["Status", "Total Price", "Action"];

  return (
    <>
      <Main>
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-bold text-stone-800">Product</h1>
          <LinkButton value={"Create"} route={"/order/create"} />
        </div>
        <div>
          <Table>
            <Thead headings={columns} />
            <Tbody>
              <Tr>
                <Td>Hello</Td>
                <Td></Td>
                <Td flex={true}>
                  <div className="cursor-pointer">
                    <I value={"fa-trash"} />
                  </div>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
        <ToastContainer />
      </Main>
    </>
  );
}
