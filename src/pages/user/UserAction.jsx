import { useEffect } from "react";
import Main from "../../components/layout/Main";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../utils/Button";
import LinkButton from "../../utils/LinkButton";
import Label from "../../utils/Label";
import Input from "../../utils/Input";
import { createdUserAction, updatedUserAction } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { setFields } from "../../store/slices/userSlice";
export default function UserAction() {

    const location = useLocation();
    const userData = location.state?.user;      
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, name, email, password, confirmPassword } = useSelector((state) =>  state.user) ;

    useEffect(() => {
        if (userData) {
            dispatch(setFields({userId:userData.id, name:userData.name || "", email:userData.email || ""}))
        }
        console.log("User Data:", userData);
    }, [userData,dispatch])  

    const handleUserAction = (e) => {
        e.preventDefault();
        if (userId) {
            updatedUserAction(userId,name,email); navigate('/user');
        } else {
            createdUserAction(dispatch,name,email,password,confirmPassword);
        }
    }

    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">{userData ? 'Update User' : 'Create User'}</h2>
                    <LinkButton route={"/user"} value={"Back"} />
                </div>
                <form className="space-y-4" onSubmit={handleUserAction}>
                    <div>
                        <Label value={"Full Name"} />
                        <Input type={'text'} value={name} onChange={(e) => dispatch(setFields({name:e.target.value}))} placeholder={'Enter full name'} />
                    </div>
                    <div>
                        <Label value={"Email"} />
                        <Input type={'email'} value={email} onChange={(e) => dispatch(setFields({email:e.target.value}))} placeholder={'Enter email address'} />
                    </div>
                    {!userData && (
                        <>
                            <div>
                                <Label value={"Password"} />
                                <Input type={'password'} value={password} onChange={(e) => dispatch(setFields({password:e.target.value}))} placeholder={'Enter password'} />
                            </div>
                            <div>
                                <Label value={"Confirm Password"} />
                                <Input type={'password'} value={confirmPassword} onChange={(e) => dispatch(setFields({confirmPassword:e.target.value}))} placeholder={'Enter confirm password'} />
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
