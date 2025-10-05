import Button from "./Button";

export default function Modal({ title, children, onSubmit, onClick }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
          <h2 className="font-semibold mb-4 border-b border-stone-800 text-md pb-1">
            {title}
          </h2>
          {children}
          <form onSubmit={onSubmit}>
            <div className="border-t border-stone-800 mt-4 gap-1 flex justify-between pt-2">
              <Button onClick={onClick} value={"Cancel"}/>
              <Button value={"Submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
