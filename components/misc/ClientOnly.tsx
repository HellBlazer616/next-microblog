/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';

type Props = {
  [x: string]: any;
  children: ReactNode;
};
export default function ClientOnly({
  children,
  ...delegated
}: Props): JSX.Element | null {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}
