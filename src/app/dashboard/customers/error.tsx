'use client';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <p>Here you can manage your customers and view their information.</p>
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-700">Error loading customers</p>
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}

export default Error;
