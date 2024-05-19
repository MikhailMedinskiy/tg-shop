import React, { ReactNode, FC } from 'react';

interface CheckProps {
  children: ReactNode;
}

interface CheckIfProps {
  state: boolean;
  children: ReactNode;
}

interface CheckElseProps {
  children: ReactNode;
}

const Check: FC<CheckProps> & {
  If: FC<CheckIfProps>;
  Else: FC<CheckElseProps>;
} = ({ children }) => {
  let elseChild: ReactNode = null;
  let firstTrueChild: ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (
        firstTrueChild == null &&
        child.type === Check.If &&
        child.props.state
      ) {
        firstTrueChild = child;
      }
      if (child.type === Check.Else) {
        elseChild = child;
      }
    }
  });

  return <>{firstTrueChild ? firstTrueChild : elseChild}</>;
};

Check.If = ({ children }: CheckIfProps) => <>{children}</>;
Check.Else = ({ children }: CheckElseProps) => <>{children}</>;

export default Check;
