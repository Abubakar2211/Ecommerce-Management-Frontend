import { Link } from "react-router-dom";

export default function LinkButton({value,route}) {
  return (
    <>
      <div>
        <Link
          to={route}
          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-white-700 cursor-pointer text-xs"
        >
          {value}   
        </Link>
      </div>
    </>
  );
}
