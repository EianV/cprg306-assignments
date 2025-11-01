export default function Item({ name,quantity,category, onSelect }) {
  return (
    <main>
      <div className="flex items-center justify-center cursor-pointer" onClick={() => onSelect({name, quantity, category})}>
        <div className="text-amber-600 text-center text-3xl p-4 w-100 bg-blue-950 mb-2 mt-2">
          <h1>{name}</h1>
          <p>
            Buy {quantity} in {category}
          </p>
        </div>
      </div>
    </main>
  );
}
