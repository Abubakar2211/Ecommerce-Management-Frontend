import { ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Label from "../../utils/Label";
import LinkButton from "../../utils/LinkButton";

export default function OrderForm() {
    const handleProductAction = async (e) => {
        e.preventDefault();
        
    }
    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">Create Product</h2>
                    <LinkButton route={"/product"} value={"Back"} />
                </div>
                <form className="space-y-4" onSubmit={handleProductAction}>
                    <div>
                        <Label value={"Name"} />
                        <Input type={'text'} />
                    </div>
                    <div>
                        <Label value={"Description"} />
                        <Input type={'text'} />
                    </div>
                    <div>
                        <Label value={"Price"} />
                        <Input type={'number'} />
                    </div>
                    <div>
                        <Label value={"Stock"} />
                        <Input type={'number'} />
                    </div>
                    <div>
                        <Label value={"Category"} />
                        <Input type={'text'} />
                    </div>
                    <div>
                        <Label value={"Sub Category"} />
                        <Input type={'text'} />
                    </div>
                    <div>
                        <Label value={"Brand"} />
                        <Input type={'text'} />
                    </div>
                    <div>
                        <Label value={"Image"} />
                        <Input type={'file'} />
                    </div>
                    <Button value={"Create Product"} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}