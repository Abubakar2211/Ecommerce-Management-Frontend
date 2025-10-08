import { toast, ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Label from "../../utils/Label";
import LinkButton from "../../utils/LinkButton";
import { useEffect, useState } from "react";
import Api from "../../utils/api";
import { useLocation } from "react-router-dom";

export default function RoleAction() {
    const location = useLocation();
    const roleData = location.state?.role;
    console.log(roleData);
    const [name, setName] = useState("");
    const [roleId, setRoleId] = useState("");

    useEffect(() => {
        if (roleData) {
            setRoleId(roleData.id);
            setName(roleData.name || "");
        }
        console.log("Role Data:", roleData);
    }, [roleData]);

    const CreateRole = () => {
        
    }
    const handleRoleAction = async (e) => {
        e.preventDefault();
        try {
            const res = await Api().post('/role', { name });
            toast.success(res.data.message);
            setName("");
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };


    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">{roleData ? "Update Role" : "Create Role"}</h2>
                    <LinkButton route={"/role"} value={"Back"} />
                </div>
                <form className="space-y-4" onSubmit={handleRoleAction}>
                    <div>
                        <Label value={"Role Name"} />
                        <Input type={'text'} value={roleData?.name || name} onChange={(e) => setName(e.target.value)} placeholder={'Enter role name'} />
                    </div>
                    <Button value={roleData ? "Update Role" : "Create Role"} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );

}