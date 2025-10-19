import { toast, ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Label from "../../utils/Label";
import LinkButton from "../../utils/LinkButton";
import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialState, reducer } from "../../reducers/PermissionReducer";
import { createPermissionAction, updatePermissionAction } from "../../actions/PermissionAction";

export default function PermissionAction() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { permissionId, name } = state;
    const location = useLocation();
    const permissionData = location.state?.role;
    const navigate = useNavigate();

    useEffect(() => {
        if (permissionData) {
            dispatch({ type: "SET_FIELDS", payload: { permissionId: permissionData.id, name: permissionData.name || "" } })
        }
    }, [permissionData]);

    const handlePermissionAction = async (e) => {
        e.preventDefault();
        if (permissionData) {
            updatePermissionAction(dispatch,permissionId,name);
            navigate('/permission');
        } else {
            createPermissionAction(dispatch,name);
        }
    };

    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">{permissionData ? "Permission Update" : "Create Permission"}</h2>
                    <LinkButton route={"/permission"} value={"Back"} />
                </div>
                <form className="space-y-4" onSubmit={handlePermissionAction}>
                    <div>
                        <Label value={"Permission Name"} />
                        <Input type={'text'} value={name} onChange={(e) => dispatch({type:"SET_FIELDS",payload:{name:e.target.value}})} placeholder={'Enter permission name'} />
                    </div>
                    <Button value={permissionData ? "Permission Update" : "Create Permission"} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}