export default function Button({ value, type = "submit", onClick }) {
  return (
    <>
      <div>
        <button
          type={type}
          onClick={onClick}
          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-white-700 cursor-pointer text-xs"
        >
          {value}
        </button>
      </div>
    </>
  );
}
