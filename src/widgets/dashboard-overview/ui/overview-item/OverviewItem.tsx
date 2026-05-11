import { OverviewItemProps } from "@/widgets/dashboard-overview";

export function OverviewItem({ title, value }: OverviewItemProps) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}