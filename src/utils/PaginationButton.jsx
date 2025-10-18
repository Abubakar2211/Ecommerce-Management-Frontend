export default function PaginationButton({
  onClick,
  condition,
  value,
  disabled,
}) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 rounded-md h-8 w-18 text-xs ${
          condition
            ? "bg-blue-500 text-white hover:bg-blue-70 cursor-pointer transition-all duration-300 ease-in-out"
            : "bg-stone-300 text-stone-500 cursor-not-allowed"
        }`}
      >
        {value}
      </button>
    </>
  );
}
