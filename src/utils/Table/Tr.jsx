export default function Tr({ children }) {
  return (
    <tr className="hover:bg-gray-200 transition">
      {children}
    </tr>
  );
}
