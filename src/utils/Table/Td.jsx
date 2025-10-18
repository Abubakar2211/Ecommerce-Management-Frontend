export default function Td({children,flex}) {
    return <>
        <td className={`px-6 py-4  text-stone-700  text-xs ${flex ? "flex space-x-3" : ""} `}>
            {children}
        </td>
    </>
}