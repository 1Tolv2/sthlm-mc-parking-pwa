import React, { PropsWithChildren } from "react";

export default function Layout({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  return (
    <main className="relative flex flex-col justify-between h-[100dvh] w-screen p-sm lg:p-md bg-white">
      {children}
    </main>
  );
}
