import { Link } from "react-router-dom";

export default function Tbody({ data, columns, actions }) {
  return (
    <tbody className="divide-y divide-stone-200">
      {data.map((row, index) => (
        <tr key={row.id || index} className="hover:bg-stone-100 transition">
          {columns.map((col) => col.key !== "actions" ? (<td key={col.key} className="px-6 py-4 text-stone-700 text-xs">{row[col.key]}</td>) :(
              <td key={col.key} className="px-6 py-4 text-stone-700 flex space-x-3">
                {actions.map((action, index) => action.to ? (
                    <Link key={index} to={typeof action.to === "function" ? action.to(row) : action.to} state={action.state ? action.state(row) : null}>
                      <i className={`fa-solid ${action.icon} text-md`}></i>
                    </Link> ) : (
                    <div key={index} className="cursor-pointer" onClick={() => action.onClick(row)}>
                      <i className={`fa-solid ${action.icon} text-md`}></i>
                    </div>
                  ))}
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  );
}
