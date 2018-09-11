import * as React from 'react';

interface ButtonRowProps {
  alignment?: string;
}

export const ButtonRow: React.StatelessComponent<ButtonRowProps> = props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: props.alignment,
    }}
  >
    {props.children}
  </div>
);

ButtonRow.defaultProps = { alignment: 'flex-end' };
