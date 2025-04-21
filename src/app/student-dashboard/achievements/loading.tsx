/**
 * Loading component for the Achievements page
 * Displayed when the achievements page is loading
 */
export default function AchievementsLoading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="h-4 w-72 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Skeleton for achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col h-[220px]">
            <div className="p-5 flex-grow">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse mr-3"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse mt-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mt-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse mt-2"></div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
