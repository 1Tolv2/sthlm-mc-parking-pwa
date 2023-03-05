import React, { PropsWithChildren } from "react";

export default function Layout({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  return (
    <main className="relative h-screen w-screen bg-neutral">{children}</main>
  );
}
