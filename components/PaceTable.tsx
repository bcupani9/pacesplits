import { Split, formatDuration, formatPace } from "@/lib/vdot";

interface PaceTableProps {
  splits: Split[];
}

export default function PaceTable({ splits }: PaceTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left font-semibold text-gray-700"
            >
              Marker
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-semibold text-gray-700"
            >
              Split
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-semibold text-gray-700"
            >
              Cumulative
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {splits.map((split) => (
            <tr key={split.mile} className="hover:bg-gray-50">
              <td className="px-4 py-2.5 font-medium text-gray-900">
                {split.label}
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-700">
                {formatPace(split.splitTimeSeconds)}
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-900">
                {formatDuration(split.cumulativeTimeSeconds)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
