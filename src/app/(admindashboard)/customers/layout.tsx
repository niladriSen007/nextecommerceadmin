"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import path from "path";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import Link from "next/link";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSecondBreadCrumb, setShowSecondBreadCrumb] = useState(true);

  const pathname = usePathname();
  const [showInBreadCrumb, setShowInBreadCrumb] = useState(
    pathname?.split("/")?.at(-1)
  );

  useEffect(() => {

    // console.log(pathname);
    if ( pathname?.split("/")?.at(-1) === "customers") {
      setShowSecondBreadCrumb(false);
    } else {
      setShowSecondBreadCrumb(true);
      switch ( pathname?.split("/")?.at(-1)) {
        case "createnewproduct":
          setShowInBreadCrumb("Create Product");
          break;
        default:
          setShowInBreadCrumb(pathname?.split("/")?.at(-1)); 
          break;
      }
    }
  }, [pathname]);

  return (
    <>
      <div className="px-10 pt-14">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                href="/orders"
                className="text-base font-semibold"
              >
                Customers
              </Link>
            </BreadcrumbItem>
            {showSecondBreadCrumb && <BreadcrumbSeparator />}
            {showSecondBreadCrumb && (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium">
                  {showInBreadCrumb}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {children}
      <Toaster />
    </>
  );
}
