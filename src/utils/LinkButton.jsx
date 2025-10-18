import { Link } from "react-router-dom";

export default function LinkButton({value,route}) {
  return (
    <>
      <div>
        <Link
          to={route}
          className="px-4 bg-white-500 text-xs bg-blue-500 text-white  hover:bg-blue-700  py-2 rounded transition-all duration-300 ease-in-out cursor-pointer"
        >
          {value}   
        </Link>
      </div>
    </>
  );
}
