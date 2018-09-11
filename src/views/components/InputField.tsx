import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { observer } from 'mobx-react';

interface InputFieldProps extends TextFieldProps {
  className?: string;
  onChanged(value: any): void;
  store: any;
  editKey: string;
}

function parseNumber(value: string): number | null {
  return value === '' ? null : parseFloat(value);
}

@observer
export class NumberInputField extends React.Component<InputFieldProps, {}> {
  render() {
    const { className, onChanged, onKeyDown, value, defaultValue, store, editKey, ...textFieldProps } = this.props;
    const displayValue = store[editKey] || '';

    return (
      <TextField
        {...textFieldProps}
        value={displayValue}
        className={className}
        onChange={this._onChange}
        onBlur={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  }

  private _onChange = event => {
    const nextValue = event.target.value;
    const { onChanged } = this.props;
    onChanged(parseNumber(nextValue));
  };

  private _onKeyDown = event => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    } else {
      const { key } = event;
      if (key === 'Enter') {
        event.target.blur();
      }
    }
  };
}
