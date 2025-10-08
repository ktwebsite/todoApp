export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      <p className="ml-4 text-lg text-gray-600">読み込み中...</p>
    </div>
  );
}
