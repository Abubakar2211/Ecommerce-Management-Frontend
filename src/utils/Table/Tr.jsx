export default function Tr({ children }) {
  return (
    <tr className="hover:bg-gray-100 transition">
      {children}
    </tr>
  );
}
