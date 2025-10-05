import { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../utils/Button";
import LinkButton from "../../utils/LinkButton";
import Label from "../../utils/Label";
import Input from "../../utils/Input";
export default function UserAction() {

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const userData = location.state?.user;
    const navigate = useNavigate();

    useEffect(()=>{
        if(userData){
             setUserId(userData.id)
             setName(userData.name || "");
             setEmail(userData.email || "");
        }
        console.log("User Data:", userData);
    },[userData])

    const createdUser = async () => {
        try {
            const res = await Api().post('/user', { name, email, password, password_confirmation: confirmPassword });
            res.data.message ? toast.success(res.data.message) : toast.error(res.data.error)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }
    const updatedUser = async () => {
        try {
            const res = await Api().patch(`/user/${userId}`, { name, email});
            res.data.message ? toast.success(res.data.message) : toast.error(res.data.error)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

    const handleUserAction = (e) => {
        e.preventDefault();
        if(userId){
            updatedUser();
            navigate('/user');
        }else{
            createdUser();
            setName(""), setEmail(""), setPassword(""), setConfirmPassword("")
        }
    }

    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">{userData ? 'Update User' : 'Create User'}</h2>
                    <LinkButton route={"/user"} value={"Back"}/>
                </div>
                <form className="space-y-4" onSubmit={handleUserAction}>
                    <div>
                        <Label value={"New Password"}/>
                        <Input type={'text'} value={name} onChange={(e) => setName(e.target.value)} placeholder={'Enter full name'}/>
                    </div>
                    <div>
                        <Label value={"Email"}/>
                        <Input type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Enter email address'}/>
                    </div>
                    {!userData && ( 
                        <>
                            <div>
                                <Label value={"Password"}/>
                                <Input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Enter password'}/>
                            </div>
                            <div>
                                <Label value={"Confirm Password"}/>
                                <Input type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={'Enter confirm password'}/>
                            </div>
                        </>
                    )}
                    <Button value={userData ? 'Update User' : 'Create User'} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}
