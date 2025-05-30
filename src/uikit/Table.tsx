import React from 'react';

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  caption?: string;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ headers, rows, caption, className = '' }) => (
  <div className="uk-overflow-auto">
    <table className={`uk-table uk-table-hover uk-table-divider ${className}`}>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <td key={cellIdx}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
); 