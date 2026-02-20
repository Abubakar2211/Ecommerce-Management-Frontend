import { ToastContainer } from "react-toastify";
import Main from "../../components/layout/Main";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Label from "../../utils/Label";
import LinkButton from "../../utils/LinkButton";
import { useForm } from "react-hook-form"
import { createProduct } from "../../actions/ProductAction";
import { useDispatch } from "react-redux";

export default function OrderForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues:{
            vendor_id:1
        }
    });
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log("Product Data:", data);
        const formData = new FormData();
        for (let key in data) {
            if (key === "image" && data[key].length > 0) {
                const file = data[key][0]
                formData.append("image",file);
            } else {
                formData.append(key, data[key]);
            }
        }
        reset()
        dispatch(createProduct(formData));
    }
    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">Create Product</h2>
                    <LinkButton route={"/product"} value={"Back"} />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label value={"Name"} />
                        <Input {...register("name", { required: "This is required." })} type={'text'} />
                        {errors.Name && <p className="mt-1 text-sm text-red-500 font-medium">{errors.Name.message}</p>}
                    </div>
                    <div>
                        <Label value={"Description"} />
                        <Input {...register("description", { required: "This is required." })} type={'text'} />
                        {errors.Description && <p className="mt-1 text-sm text-red-500 font-medium">{errors.Description.message}</p>}
                    </div>
                    <div>
                        <Label value={"Price"} />
                        <Input {...register("price", { required: "This is required." })} type={'number'} />
                        {errors.Price && <p className="mt-1 text-sm text-red-500 font-medium">{errors.Price.message}</p>}
                    </div>
                    <div>
                        <Label value={"Stock"} />
                        <Input {...register("stock", { required: "This is required." })} type={'number'} />
                        {errors.Stock && <p className="mt-1 text-sm text-red-500 font-medium">{errors.Stock.message}</p>}

                    </div>
                    <div>
                        <Label value={"Category"} />
                        <Input {...register("category", { required: "This is required." })} type={'text'} />
                        {errors.Category && <p className="mt-1 text-sm text-red-500 font-medium">{errors.Category.message}</p>}

                    </div>
                    <div>
                        <Label value={"Sub Category"} />
                        <Input {...register("subcategory", { required: "This is required." })} type={'text'} />
                        {errors.SubCategory && <p className="mt-1 text-sm text-red-500 font-medium">{errors.SubCategory.message}</p>}

                    </div>
                    <div>
                        <Label value={"Brand"} />
                        <Input {...register("brand", { required: "This is required." })} type={'text'} />
                        {errors.Brand && <p className="mt-1 text-sm text-red-500 font-medium">{errors.Brand.message}</p>}
                    </div>
                    <div>
                        <Label value={"Image"} />
                        <Input type={'file'}   {...register("image", { required: "Image is required", validate: (files) => files.length > 0 || "Please select a file", })} />
                        {errors.Image && (<p className="mt-1 text-sm text-red-500 font-medium">{errors.Image.message}</p>)}
                    </div>
                    <Button value={"Create Product"} />
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}