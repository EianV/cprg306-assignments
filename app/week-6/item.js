export default function Item({ name,quantity,category }) {
  return (
    <main>
      <div class="flex items-center justify-center ">
        <div class="text-amber-600 text-center text-3xl p-4 w-100 bg-blue-950 mb-2 mt-2">
          <h1>{name}</h1>
          <p>
            Buy {quantity} in {category}
          </p>
        </div>
      </div>
    </main>
  );
}