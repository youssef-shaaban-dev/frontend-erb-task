"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-4">
      <div className="bg-white rounded-xl shadow-sm border border-border p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          عذراً، حدث خطأ غير متوقع
        </h2>
        <p className="text-muted-foreground mb-8">
          نحن نعتذر عن هذا الخلل. لقد تم تسجيل الخطأ وسنقوم بمعالجته في أقرب وقت.
          بإمكانك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full bg-[#003B95] hover:bg-[#003B95]/90">
            حاول مرة أخرى
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = "/")}
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}
