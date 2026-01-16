import { ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Label from "../../utils/Label";
import LinkButton from "../../utils/LinkButton";
import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialState, reducer } from "../../reducers/RoleReducer";
import { createRoleAction, updateRoleAction } from "../../actions/RoleAction";

export default function OrderForm() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { roleId, name } = state;
    const location = useLocation();
    const roleData = location.state?.role;
    const navigate = useNavigate();

    useEffect(() => {
        if (roleData) {
            dispatch({ type: "SET_FIELDS", payload: { roleId: roleData.id, name: roleData.name || "" } })
        }
    }, [roleData]);

    const handleRoleAction = async (e) => {
        e.preventDefault();
        if (roleData) {
            updateRoleAction(dispatch,roleId,name);
            navigate('/role');
        } else {
            createRoleAction(dispatch,name);
        }
    };

    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">{roleData ? "Update Order" : "Create Order"}</h2>
                    <LinkButton route={"/role"} value={"Back"} />
                </div>
                <form className="space-y-4" onSubmit={handleRoleAction}>
                    <div>
                        <Label value={"Role Name"} />
                        <Input type={'text'} value={name} 
                        onChange={(e) => dispatch({ type: "SET_FIELDS", payload: { name: e.target.value } })} placeholder={'Enter role name'} />
                    </div>
                    <Button value={roleData ? "Update Role" : "Create Role"} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}