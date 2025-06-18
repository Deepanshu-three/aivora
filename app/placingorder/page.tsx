// app/placingorder/page.tsx
import { Suspense } from "react";
import PlacingOrderContent from "./PlacingOrderContent";

export default function PlacingOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center text-lg">Loading...</div>}>
      <PlacingOrderContent />
    </Suspense>
  );
}
