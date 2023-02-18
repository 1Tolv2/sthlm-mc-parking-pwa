import React, { PropsWithChildren } from "react";

export const Layout = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element => (
  <main className="h-screen w-screen bg-neutral p-md">{children}</main>
);
