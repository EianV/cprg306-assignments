import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Shopping List
        </h1>
        <ItemList />
      </div>
    </main>
  )
}
