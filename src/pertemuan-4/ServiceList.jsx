import serviceData from "./services.json";

export default function ServiceList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serviceData.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/80 via-pink-50/70 to-rose-50/70 backdrop-blur-lg shadow-lg border border-white/40 hover:scale-[1.02] transition"
          >
            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                className="w-full h-40 object-cover hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h2>

              <p className="text-gray-500 text-sm line-clamp-2">
                {item.description}
              </p>

              <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 font-bold mt-2">
                Rp {item.price}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {item.details.provider} • {item.details.location}
              </p>

              {/* TAGS */}
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-2 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
