import { ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import LinkButton from "../../utils/LinkButton";
import Table from "../../utils/Table/Table";
import Thead from "../../utils/Table/Thead";
import Tbody from "../../utils/Table/TBody";
import Tr from "../../utils/Table/Tr";
import Td from "../../utils/Table/Td";
import I from "../../utils/I";
import { useEffect } from "react";
import { fetchProduct } from "../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../utils/Spinner";

export default function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const { products = [], loading = false } = useSelector((state) => state.product) || {};
  const columns = ["Name","Price","Stock","Category","Subcategory","Brand","Created", "Action"];

  return (
    <>
      <Main>
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-bold text-stone-800">Products</h1>
          <LinkButton value={"Create"} route={"/product/create"} />
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <Table>
              <Thead headings={columns} />
              <Tbody>
                {products.map((product, index) => (
                  <Tr key={product.id || index}>
                    <Td>{product.name}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.category}</Td>
                    <Td>{product.subcategory}</Td>
                    <Td>{product.brand}</Td>
                    <Td>{new Date(product.created_at).toLocaleDateString()}</Td>
                    <Td flex={true}>
                      <div className="cursor-pointer">
                        <I value={"fa-trash"} />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </div>
        <ToastContainer />
      </Main>
    </>
  );
}
