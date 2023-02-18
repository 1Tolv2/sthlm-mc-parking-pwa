import React, { PropsWithChildren } from "react";

export default function Layout({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  return (
    <main className="flex flex-col justify-between h-screen w-screen bg-neutral p-md">
      {children}
    </main>
  );
}
