export default function Button({ value, type = "submit", onClick }) {
  return (
    <>
      <div>
        <button
          type={type}
          onClick={onClick}
          className="px-4 bg-white-500 text-xs bg-blue-500 text-white hover:bg-blue-700 py-2 rounded transition-all duration-300 ease-in-out cursor-pointer"
        >
          {value}
        </button>
      </div>
    </>
  );
}
