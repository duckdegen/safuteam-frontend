import { ReactNode } from "react";

import Loader from "../components/loader";

interface Props {
  isLoading?: boolean;
  children: ReactNode;
}

export const CenteredLayout = ({ children, isLoading }: Props) => (
  <div className="w-full">
    <div className="flex h-screen items-center justify-center pl-4">
      <div className="flex flex-col items-center space-y-6">
        <Loader />
        {children}
      </div>
    </div>
  </div>
);
