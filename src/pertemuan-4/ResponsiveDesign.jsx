export default function ResponsiveDesign() {
  return (
    <div className="p-6">

      <p className="text-sm md:text-lg lg:text-xl xl:text-2xl">
        Ini contoh responsive text
      </p>

      <div className="flex flex-col md:flex-row mt-4">
        <div className="bg-red-400 w-full md:w-1/2 p-4">Kolom 1</div>
        <div className="bg-blue-400 w-full md:w-1/2 p-4">Kolom 2</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-green-400 p-4">Box 1</div>
        <div className="bg-green-400 p-4">Box 2</div>
        <div className="bg-green-400 p-4">Box 3</div>
        <div className="bg-green-400 p-4">Box 4</div>
      </div>

    </div>
  );
}