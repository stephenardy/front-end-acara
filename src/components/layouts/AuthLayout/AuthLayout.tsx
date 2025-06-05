import { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

function AuthLayout(props: PropTypes) {
  const { title, children } = props;

  return (
    <>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </>
  );
}

export default AuthLayout;
