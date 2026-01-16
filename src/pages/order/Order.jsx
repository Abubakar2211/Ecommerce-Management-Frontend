import Main from "../../components/layout/Main";
import { useEffect } from "react";
import LinkButton from "../../utils/LinkButton";
import { ToastContainer } from "react-toastify";
import { fetchOrders } from "../../actions/OrderAction";
import { deleteOrder } from "../../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../utils/Table/Table";
import Thead from "../../utils/Table/Thead";
import Tbody from "../../utils/Table/TBody";
import Tr from "../../utils/Table/Tr";
import Td from "../../utils/Table/Td";
import Spinner from "../../utils/Spinner";
import I from "../../utils/I";

export default function Permission() {

    const dispatch = useDispatch();
    const { orders = [], loading = false } = useSelector(state => state.order) || {};
    const columns = ['Status', 'Total Price', 'Action'];
    
    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId));
    };
    useEffect(() => {
        dispatch(fetchOrders());    
    }, [dispatch]);
    return (
        <>
            <Main>
                <div className="flex justify-between mb-3">
                    <h1 className="text-2xl font-bold text-stone-800">Roles</h1>
                    <LinkButton value={"Create"} route={"/order/create"} />
                </div>
                <div>
                    {loading ? <Spinner /> :
                        <Table>
                            <Thead headings={columns} />
                            <Tbody>
                                {orders.map((order, index) => (
                                    <Tr key={order.id || index}>
                                        <Td>{order.status}</Td>
                                        <Td>{order.total_price}</Td>
                                        <Td flex={true}>
                                            <div className="cursor-pointer" onClick={() => handleDeleteOrder(order.id)}>
                                                <I value={"fa-trash"} />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    }
                </div>
                <ToastContainer />
            </Main>
        </>
    );
}
