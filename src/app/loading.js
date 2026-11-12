
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-emerald-700" />

      <p className="text-lg font-medium text-stone-600">
        Loading BookNook...
      </p>
    </div>
  );
}
