'use client';

function Error() {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <p>Here you can manage your invoices and view their details.</p>
      <ul>
        <li className="flex justify-between border-b py-2">
          <span>Error loading invoices</span>
        </li>
      </ul>
    </div>
  );
}

export default Error;
