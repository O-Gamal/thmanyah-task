export function SearchResultsSkeleton() {
  return (
    <>
      <h2 className="md:text-lg mb-4 text-accent-foreground">جاري البحث...</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-[20px] animate-pulse"
          >
            <div className="relative overflow-hidden rounded-2xl mb-2 aspect-square bg-accent/50" />
            <div className="ps-2 pb-4">
              <div className="h-4 bg-accent/50 rounded w-3/4 mb-2" />
              <div className="h-3 bg-accent/50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
