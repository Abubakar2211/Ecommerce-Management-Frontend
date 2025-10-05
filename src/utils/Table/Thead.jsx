export default function Thead({ headings }) {
  return (
    <>
      <thead className="bg-stone-800 text-white">
        <tr>
          {headings.map((heading, index) => (
            <th key={index} className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}
