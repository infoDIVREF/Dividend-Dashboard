export default function InvoicesTableSkeleton() {
  return (
    <div className="min-h-[80vh] max-h-[80vh] bg-white rounded-xl w-full overflow-scroll flex flex-col justify-between shadow-2xl animate-pulse">
      <table className="min-w-full table-auto rounded-lg">
        <thead className="bg-azul rounded-lg sticky top-0 z-10">
          <tr className="text-white">
            <th className="text-center px-4 py-2 pl-5">Año</th>
            <th className="text-start px-4 py-2">Número factura</th>
            <th className="text-start px-4 py-2">Concepto</th>
            <th className="text-start px-4 py-2">Subtotal</th>
            <th className="text-start px-4 py-2">Total</th>
            <th className="text-center px-4 py-2">Descargar</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <tr key={idx}>
              <td className="px-4 py-3">
                <div className="h-4 w-10 bg-gray-200 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </td>
              <td className="px-4 py-3 text-center">
                <div className="h-6 w-6 bg-gray-200 rounded mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full bg-white flex items-center justify-between px-6 py-4 sticky bottom-0 z-10 text-sm">
        <div className="h-8 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-8 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
