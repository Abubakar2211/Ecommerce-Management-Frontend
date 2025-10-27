import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect } from "react";
import Spinner from "../../utils/Spinner";
import LinkButton from "../../utils/LinkButton";
import Table from "../../utils/Table/Table";
import Thead from "../../utils/Table/Thead";
import Label from "../../utils/Label";
import Input from "../../utils/Input";
import Modal from "../../utils/Modal";
import PaginationButton from "../../utils/PaginationButton";
import Td from "../../utils/Table/Td";
import Tr from "../../utils/Table/Tr";
import I from "../../utils/I";
import Tbody from "../../utils/Table/TBody";
import { togglePasswordModal, toggleAssignRoleModal, toggleAssignPermissionModal, setFields } from "../../store/slices/userSlice";
import { changePasswordAction, deleteUserAction, getPermissions, getRoles, getUserAction } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../utils/api";

export default function User() {
    const dispatch = useDispatch();
    const { user, nextPage, prevPage, passwordChange, selectedUser, password, confirmPassword, loading, assignPermission, assignRole, roles, permissions } = useSelector((state) => state.user);
    const getUser = useCallback((url) => getUserAction(dispatch, url), [dispatch]);
    const handleDeleteUser = (id) => deleteUserAction(dispatch, id, getUser);
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        changePasswordAction(dispatch, selectedUser, password, confirmPassword)
    };
    const columns = ["S.No", "Name", "Email", "Action"];
    const handlegetRoles = async (e) => {
        e.preventDefault();
        getRoles(dispatch); 
    }
    const handlegetPermissions = async (e) => {
        e.preventDefault();
        getPermissions(dispatch); 
    }
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {passwordChange && selectedUser && (
                <Modal title={`${selectedUser.name} Change Password`} onSubmit={handlePasswordChange} onClick={() =>
                    dispatch(togglePasswordModal({ status: false, user: null }))}>
                    <input type="hidden" value={selectedUser.id} name="userId" readOnly />
                    <div>
                        <Label value={"New Password"} />
                        <Input type="password" onChange={(e) => dispatch(setFields({ password: e.target.value }))} placeholder={"Enter new password"} />
                    </div>
                    <div>
                        <Label value={"Confirm Password"} />
                        <Input type="password" onChange={(e) => dispatch(setFields({ confirmPassword: e.target.value }))} placeholder={"Enter confirm password"} />
                    </div>
                </Modal>
            )}

            {assignRole && selectedUser && (
                <Modal title={`${selectedUser.name} Assign Role`} onSubmit={handlegetRoles}
                    onClick={() => dispatch(toggleAssignRoleModal({ status: false, user: null }))}>
                    <input type="hidden" value={selectedUser.id} name="userId" readOnly />
                    <div className="grid grid-cols-3 gap-4 mt-3">
                        {roles.map((role) => (
                            <div key={role.id} className="flex items-center gap-2">
                                <input type="checkbox" name="roles[]" value={role.name} className="cursor-pointer" />
                                <label className="text-xs font-medium text-gray-800">{role.name}</label>
                            </div>
                        ))}
                    </div>
                </Modal>
            )}

            {assignPermission && selectedUser && (
                <Modal title={`${selectedUser.name} Assign Permission`} onSubmit={handlegetPermissions} onClick={() =>
                    dispatch(toggleAssignPermissionModal({ status: false, user: null }))}>
                    <input type="hidden" value={selectedUser.id} name="userId" readOnly />
                    <div className="grid grid-cols-3 gap-4 mt-3">
                        {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center gap-2">
                                <input type="checkbox" name="permissions[]" value={permission.name} className="cursor-pointer" />
                                <label className="text-xs font-medium text-gray-800">{permission.name}</label>
                            </div>
                        ))}
                    </div>
                </Modal>
            )}


            <Main>
                <div className="flex justify-between mb-3">
                    <h1 className="text-2xl font-bold text-stone-800">Users</h1>
                    <LinkButton route={"/user/create"} value={"Create"} />
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div>
                        <Table>
                            <Thead headings={columns} />
                            <Tbody>
                                {user.map((item, index) => (
                                    <Tr key={item.id || index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.email}</Td>
                                        <Td flex={true}>
                                            <div onClick={() =>
                                                dispatch(togglePasswordModal({ status: true, user: item }))
                                            } className="cursor-pointer">
                                                <I value={"fa-key"} />
                                            </div>
                                            <div onClick={(e) => {
                                                dispatch(toggleAssignRoleModal({ status: true, user: item }));
                                                handlegetRoles(e);
                                            }} className="cursor-pointer">
                                                <I value={"fa-user-lock"} />
                                            </div>
                                            <div onClick={(e) => {
                                                dispatch(toggleAssignPermissionModal({ status: true, user: item }))
                                                handlegetPermissions(e);
                                            }} className="cursor-pointer">
                                                <I value={"fa-user-shield"} />
                                            </div>
                                            <Link to={`/user/edit/${item.id}`} state={{ user: item }}>
                                                <I value={"fa-pen-to-square"} />
                                            </Link>
                                            <div className="cursor-pointer" onClick={() => handleDeleteUser(item.id)}>
                                                <I value={"fa-trash"} />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        <div className="flex justify-end mt-3 gap-0.5">
                            <PaginationButton onClick={() => prevPage && getUser(prevPage)} disabled={!prevPage} condition={!!prevPage} value={"Previous"} />
                            <PaginationButton onClick={() => nextPage && getUser(nextPage)} disabled={!nextPage} condition={!!nextPage} value={"Next"} />
                        </div>
                    </div>
                )}
                <ToastContainer />
            </Main>
        </>
    );
}
