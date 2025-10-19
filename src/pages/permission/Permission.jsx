import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { useCallback, useEffect, useReducer, useState } from "react";
import I from "../../utils/I";
import Td from "../../utils/Table/Td";
import Tr from "../../utils/Table/Tr";
import Table from "../../utils/Table/Table";
import LinkButton from "../../utils/LinkButton";
import Thead from "../../utils/Table/Thead";
import Tbody from "../../utils/Table/TBody";
import Spinner from "../../utils/Spinner";
import { ToastContainer } from "react-toastify";
import { initialState, reducer } from "../../reducers/PermissionReducer";
import { deletePermissionAction, getPermissionAction } from "../../actions/PermissionAction";

export default function Permission() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { permission, loading } = state;
    const getPermission = useCallback(() => getPermissionAction(dispatch), [dispatch])
    const handlePermissionDelete = (id) => deletePermissionAction(dispatch, id, getPermission)
    const columns = ['Name', 'Action'];

    useEffect(() => {
        getPermission();
    }, [getPermission]);
    return (
        <>
            <Main>
                <div className="flex justify-between mb-3">
                    <h1 className="text-2xl font-bold text-stone-800">Permissions</h1>
                    <LinkButton value={"Create"} route={"/permission/create"} />
                </div>
             <div>
                    {loading  ? <Spinner /> :
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
                                            <div className="cursor-pointer" onClick={() => handlePermissionDelete(permission.id)}>
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
