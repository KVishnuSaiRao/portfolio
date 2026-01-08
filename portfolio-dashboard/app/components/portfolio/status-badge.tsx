export function StatusBadge({ isValidating }: { isValidating: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${isValidating ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
      <div className={`w-2 h-2 rounded-full ${isValidating ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
      {isValidating ? 'Updating...' : 'Live'}
    </div>
  );
}