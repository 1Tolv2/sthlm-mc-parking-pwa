import React, { PropsWithChildren } from "react";

export default function Layout({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  return (
    <main className="relative flex flex-col justify-between h-screen w-screen p-md bg-white">
      {children}
    </main>
  );
}
