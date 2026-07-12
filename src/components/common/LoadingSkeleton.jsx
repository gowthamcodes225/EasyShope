export const ProductCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden shadow-md bg-white animate-pulse">
    <div className="h-40 sm:h-48 bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-5 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
    {[...Array(count)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);