export default function Input({id,type,name,onChange,placeholder,value}) {
  return (
    <>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full px-3 py-1.5 text-xs rounded-lg  mt-1 mb-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500"
        placeholder={placeholder}
      />
    </>
  );
}
