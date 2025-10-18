import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import Api from "../../utils/api";
import { useCallback, useEffect, useState } from "react";
import I from "../../utils/I";
import Td from "../../utils/Table/Td";
import Tr from "../../utils/Table/Tr";
import Table from "../../utils/Table/Table";
import LinkButton from "../../utils/LinkButton";
import Thead from "../../utils/Table/Thead";
import Tbody from "../../utils/Table/TBody";
import Spinner from "../../utils/Spinner";
import { toast, ToastContainer } from "react-toastify";

export default function Permission() {

    const [permission, setPermission] = useState([]);
    const [loading, setLoading] = useState(false);
    const getPermission = useCallback(async () => {
        const res = await Api().get('/permission');
        setPermission(res.data.permissions)
        setLoading(false)
    }, [])

    useEffect(() => {
        setLoading(true)
        getPermission();
    }, [getPermission]);

    const handleRoleDelete = async (id) => {
        try {
            setLoading(true);
            const res = await Api().delete(`/permission/${id}`);
            toast.success(res.data.message);
            getPermission();  
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

    const columns = ['Name', 'Action'];
    return (
        <>
            <Main>
                <div className="flex justify-between mb-3">
                    <h1 className="text-2xl font-bold text-stone-800">Permissions</h1>
                    <LinkButton value={"Create"} route={"/permission/create"} />
                </div>
                <div>
                    {loading ? <Spinner /> :
                        <Table>
                            <Thead headings={columns} />
                            <Tbody>
                                {permission.map((permission, index) => (
                                    <Tr key={permission.id || index}>
                                        <Td>{permission.name}</Td>
                                        <Td flex={true}>
                                            <Link to={`/permission/edit/${permission.id}`} state={{permission:permission}}>
                                                <I value={"fa-pen-to-square"} />
                                            </Link>
                                            <div className="cursor-pointer" onClick={() => handleRoleDelete(permission.id)}>
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
