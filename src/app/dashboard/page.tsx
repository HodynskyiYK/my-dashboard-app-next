import { DashboardOverview, OverviewItemSkeleton } from "@/widgets/dashboard-overview";
import { Suspense } from "react";

function Dashboard() {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={
        <>
          <h3 className="text-l font-bold mb-4">Dashboard Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
            <OverviewItemSkeleton />
            <OverviewItemSkeleton />
            <OverviewItemSkeleton />
            <OverviewItemSkeleton />
          </div>
        </>}>
        <DashboardOverview />
      </Suspense>
    </div>
  );
}

export default Dashboard;