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

export default function Role() {

    const [role, setRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const getRole = useCallback(async () => {
        const res = await Api().get('/role');
        setRole(res.data.roles)
        setLoading(false)
    }, [])

    useEffect(() => {
        setLoading(true)
        getRole();
    }, [getRole]);

    const handleRoleDelete = async (id) => {
        try {
            setLoading(true);
            const res = await Api().delete(`/role/${id}`);
            toast.success(res.data.message);
            getRole();  
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
                    <h1 className="text-2xl font-bold text-stone-800">Roles</h1>
                    <LinkButton value={"Create"} route={"/role/create"} />
                </div>
                <div>
                    {loading ? <Spinner /> :
                        <Table>
                            <Thead headings={columns} />
                            <Tbody>
                                {role.map((role, index) => (
                                    <Tr key={role.id || index}>
                                        <Td>{role.name}</Td>
                                        <Td flex={true}>
                                            <Link to="/user/assignpermission" >
                                                <I value={"fa-key"} />
                                            </Link>
                                            <Link to={`/role/edit/${role.id}`} state={{role:role}}>
                                                <I value={"fa-pen-to-square"} />
                                            </Link>
                                            <div className="cursor-pointer" onClick={() => handleRoleDelete(role.id)}>
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
