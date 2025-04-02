'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const text = await uploadedFile.text();
    const rows = text
      .split('\n')
      .map((row) => row.trim())
      .filter(Boolean)
      .map((row) => row.split(','));

    setCsvData(rows);
  };

  const handleImport = async () => {
    if (csvData.length < 2) return; // no data

    setIsImporting(true);

    const [header, ...rows] = csvData;

    const body = rows.map((row) =>
      Object.fromEntries(header.map((key, i) => [key.trim(), row[i]?.trim() ?? '']))
    );

    const res = await fetch('/api/import-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: body }),
    });

    if (res.ok) {
      setImportSuccess(true);
    }

    setIsImporting(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Upload CSV</h1>

      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />

      {csvData.length > 0 && (
        <>
          <div className="overflow-x-auto border border-gray-300 rounded mb-4">
            <table className="table-auto w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {csvData[0].map((cell, i) => (
                    <th key={i} className="border border-gray-300 px-2 py-1 text-left">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleImport}
            disabled={isImporting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isImporting ? 'Importing...' : 'Import to Database'}
          </button>

          {importSuccess && (
            <p className="mt-4 text-green-600">Import successful!</p>
          )}
        </>
      )}
    </div>
  );
}
