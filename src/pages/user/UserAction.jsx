import { useEffect, useReducer } from "react";
import Main from "../../components/layout/Main";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../utils/Button";
import LinkButton from "../../utils/LinkButton";
import Label from "../../utils/Label";
import Input from "../../utils/Input";
import { userReducer, initialState } from "../../reducers/userReducer";
import { createdUserAction, updatedUserAction } from "../../actions/UserAction";
export default function UserAction() {

    const location = useLocation();
    const userData = location.state?.user;
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(userReducer, initialState);
    const { userId, name, email, password, confirmPassword } = state;

    useEffect(() => {
        if (userData) {
            dispatch({ type:"SET_FIELDS", payload:{ userId:userData.id, name:userData.name || "", email:userData.email || "",}})
        }
        console.log("User Data:", userData);
    }, [userData])  

    const handleUserAction = (e) => {
        e.preventDefault();
        if (userId) {
            updatedUserAction(dispatch,userId,name,email); navigate('/user');
        } else {
            createdUserAction(dispatch,userId,name,email,password,confirmPassword);
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
                        <Input type={'text'} value={name} onChange={(e) => dispatch({type:"SET_FIELD", field:"name", payload:e.target.value})} placeholder={'Enter full name'} />
                    </div>
                    <div>
                        <Label value={"Email"} />
                        <Input type={'email'} value={email} onChange={(e) => dispatch({type:"SET_FIELD", field:"email", payload:e.target.value,})} placeholder={'Enter email address'} />
                    </div>
                    {!userData && (
                        <>
                            <div>
                                <Label value={"Password"} />
                                <Input type={'password'} value={password} onChange={(e) => dispatch({type:"SET_FIELD", field:"password", payload:e.target.value,})} placeholder={'Enter password'} />
                            </div>
                            <div>
                                <Label value={"Confirm Password"} />
                                <Input type={'password'} value={confirmPassword} onChange={(e) => dispatch({type:"SET_FIELD", field:"confirmPassword", payload:e.target.value,})} placeholder={'Enter confirm password'} />
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
