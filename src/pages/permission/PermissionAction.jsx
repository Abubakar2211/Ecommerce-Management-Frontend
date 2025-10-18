import { toast, ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Label from "../../utils/Label";
import LinkButton from "../../utils/LinkButton";
import { useEffect, useState } from "react";
import Api from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function PermissionAction() {
    const [name, setName] = useState("");
    const [permissionId,setPermissionId] = useState("");
    const location = useLocation();
    const permissionData = location.state?.permission;
    const navigate = useNavigate();
    const createPermissionAction = async () => {
        try {
            const res = await Api().post('/permission', { name });
            toast.success(res.data.message);
            setName(""); 
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    const updatePermissionAction = async (permissionId) => {
        try {
            const res = await Api().patch(`/permission/${permissionId}`, { name });
            toast.success(res.data.message);
            navigate("/permission");
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

    const handlePermissionAction = async (e) => {
        e.preventDefault();
        if(permissionData){
            await updatePermissionAction (permissionId);
        }else{
            await createPermissionAction();
        }
    }

    useEffect(() => {
        if (permissionData) {
        setName(permissionData.name);
        setPermissionId(permissionData.id);
        }
    }, []);
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
                        <Input type={'text'} value={name} onChange={(e) => setName(e.target.value)} placeholder={'Enter permission name'} />
                    </div>
                    <Button value={permissionData ? "Permission Update" : "Create Permission"} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}