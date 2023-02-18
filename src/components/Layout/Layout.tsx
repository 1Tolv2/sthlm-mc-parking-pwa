import React, { PropsWithChildren } from "react";

export const Layout = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element => (
  <main className="bg-red-500">{children}</main>
);
