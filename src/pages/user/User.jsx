import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../utils/api";
import Spinner from "../../utils/Spinner";
import LinkButton from "../../utils/LinkButton";
import Table from "../../utils/Table/Table";
import Thead from "../../utils/Table/Thead";
import Label from "../../utils/Label";
import Input from "../../utils/Input";
import Modal from "../../utils/Modal";
import PaginationButton from "../../utils/PaginationButton";
import Td from "../../utils/Table/Td";
import I from "../../utils/I";
import Tbody from "../../utils/Table/TBody";

export default function User() {
    const [user, setUser] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [passwordChange, setPasswordChange] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const getUser = async (url = "/user") => {
        try {
            setLoading(true);
            const res = await Api().get(url);
            setUser(res.data.user.data);
            setNextPage(res.data.user.next_page_url);
            setPrevPage(res.data.user.prev_page_url);
            setLoading(false);
        } catch (error) {
            console.log([error.response?.status, error.message]);
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            setLoading(true);
            const res = await Api().delete(`/user/${id}`);
            res.data.message ? toast.success(res.data.message) : toast.error(res.data.error)
            setLoading(false);
            getUser();
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!")
        }
    }

    const newpasswordChange = async (e) => {
        e.preventDefault();
        const userId = selectedUser.id;
        console.log({ "User Id": userId, "Password": password, "Confirm Password": confirmPassword });
        try {
            const res = await Api().post(`/changePassword/${userId}`, { password, confirmPassword });
            console.log({ "Message": res.data.message });
            if (res.data.message) {
                toast.success(res.data.message);
                setPasswordChange(false);
                setPassword("");
                setConfirmPassword("");
            } else {
                toast.error(res.data.error)
            }
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!")

        }
    }
    const columns = ["S.No", "Name", "Email", "Action"];
    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            {passwordChange && (
                <Modal title={`${selectedUser.name} Change Password`} onSubmit={newpasswordChange} onClick={() => setPasswordChange(false)}>
                    <input type="hidden" value={selectedUser.id} name="userId" onChange={(e) => selectedUser(e.target.value)} />
                    <div>
                        <Label value={"New Password"} />
                        <Input type={'password'} onChange={(e) => setPassword(e.target.value)} placeholder={'Enter new password'} />
                    </div>
                    <div>
                        <Label value={"Confirm Password"} />
                        <Input type={'password'} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={'Enter confirm pasword'} />
                    </div>
                </Modal>)}
            <Main>
                <div className="flex justify-between mb-3">
                    <h1 className="text-2xl font-bold text-stone-800">Users</h1>
                    <LinkButton route={"/user/create"} value={"Create"} />
                </div>
                {loading ? (<Spinner />) : (
                    <div>
                        <Table>
                            <Thead headings={columns} />
                            <Tbody>
                                {user.map((user, index) => (
                                    <tr key={user.id || index} className="hover:bg-stone-100 transition">
                                        <Td>{index + 1}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td flex={true} >
                                            <div onClick={() => { setPasswordChange(true); setSelectedUser(user) }} className="cursor-pointer">
                                                <I value={"fa-key"} />
                                            </div>
                                            <Link to="/user/assignpermission">
                                                <I value={"fa-user-lock"} />
                                            </Link>
                                            <Link to={`/user/assignrole/${user.id}`}>
                                                <I value={"fa-user-shield"} />
                                            </Link>
                                            <Link to={`/user/edit/${user.id}`} state={{ user }}>
                                                <I value={"fa-pen-to-square"} />
                                            </Link>
                                            <div className="cursor-pointer" onClick={() => handleDeleteUser(user.id)}>
                                                <I value={"fa-trash"} />
                                            </div>
                                        </Td>
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                        <div className="flex justify-end mt-3 gap-0.5">
                            <PaginationButton onClick={() => prevPage && getUser(prevPage)} disabled={!prevPage} condition={prevPage} value={"Previous"} />
                            <PaginationButton onClick={() => nextPage && getUser(nextPage)} disabled={!nextPage} condition={nextPage} value={"Next"} />
                        </div>
                    </div>
                )}
                <ToastContainer />
            </Main>
        </>
    );
}
