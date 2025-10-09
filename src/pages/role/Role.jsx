import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { useCallback, useEffect, useReducer } from "react";
import I from "../../utils/I";
import Td from "../../utils/Table/Td";
import Tr from "../../utils/Table/Tr";
import Table from "../../utils/Table/Table";
import LinkButton from "../../utils/LinkButton";
import Thead from "../../utils/Table/Thead";
import Tbody from "../../utils/Table/TBody";
import Spinner from "../../utils/Spinner";
import { ToastContainer } from "react-toastify";
import { reducer, initialState } from "../../reducers/RoleReducer";
import { deleteRoleAction, getRoleAction } from "../../actions/RoleAction";


export default function Role() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { role, loading } = state;
    const getRole = useCallback(() => getRoleAction(dispatch), [dispatch])
    const handleRoleDelete = (id) => deleteRoleAction(dispatch, id, getRole)
    const columns = ['Name', 'Action'];

    useEffect(() => {
        getRole();
    }, [getRole]);

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
                                            <Link to={`/role/edit/${role.id}`} state={{ role: role }}>
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
