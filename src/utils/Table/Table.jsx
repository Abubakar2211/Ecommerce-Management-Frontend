export default function Table({ children }) {
  return (
    <>
      <table className="w-full  border border-stone-200 shadow-md rounded-lg border-rounded">{children}</table>
    </>
  );
}
