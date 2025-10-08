import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect, useReducer } from "react";
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
import { userReducer, initialState } from "../../reducers/userReducer";
import { changePasswordAction, deleteUserAction, getUserAction } from "../../actions/UserAction";

export default function User() {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { user, nextPage, prevPage, passwordChange, selectedUser, password, confirmPassword, loading,} = state;
    const getUser = useCallback( (url) =>  getUserAction(dispatch,url),[dispatch]);
    const handleDeleteUser = (id) => deleteUserAction(dispatch,id,getUser);
    const handlePasswordChange = async (e) => {  
        e.preventDefault(); 
        changePasswordAction(dispatch,selectedUser,password,confirmPassword)
    };

    const columns = ["S.No", "Name", "Email", "Action"];

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {passwordChange && selectedUser && (
                <Modal title={`${selectedUser.name} Change Password`} onSubmit={handlePasswordChange} onClick={() =>
                    dispatch({ type: "TOGGLE_PASSWORD_MODAL", payload: { status: false, user: null }, })}>
                    <input type="hidden" value={selectedUser.id} name="userId" readOnly />
                    <div>
                        <Label value={"New Password"} />
                        <Input type="password" onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", payload: e.target.value })} placeholder={"Enter new password"} />
                    </div>
                    <div>
                        <Label value={"Confirm Password"} />
                        <Input type="password" onChange={(e) => dispatch({ type: "SET_FIELD", field: "confirmPassword" , payload: e.target.value, })} placeholder={"Enter confirm password"} />
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
                                                dispatch({ type: "TOGGLE_PASSWORD_MODAL", payload: { status: true, user: item }, })
                                            } className="cursor-pointer">
                                                <I value={"fa-key"} />
                                            </div>
                                            <Link to="/user/assignpermission">
                                                <I value={"fa-user-lock"} />
                                            </Link>
                                            <Link to={`/user/assignrole/${item.id}`}>
                                                <I value={"fa-user-shield"} />
                                            </Link>
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
                            <PaginationButton onClick={() => prevPage && getUser(prevPage)} disabled={!prevPage} condition={!!prevPage} value={"Previous"}/>
                            <PaginationButton onClick={() => nextPage && getUser(nextPage)} disabled={!nextPage} condition={!!nextPage} value={"Next"}/>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </Main>
        </>
    );
}
