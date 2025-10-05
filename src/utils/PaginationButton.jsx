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
        className={`px-3 rounded-lg h-8 text-xs ${
          condition
            ? "bg-stone-800 text-white hover:bg-stone-700"
            : "bg-stone-300 text-stone-500 cursor-not-allowed"
        }`}
      >
        {value}
      </button>
    </>
  );
}
