import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/context/ToasterContext";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ToasterProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </ToasterProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
