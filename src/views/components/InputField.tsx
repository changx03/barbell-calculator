import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';

interface InputFieldProps extends TextFieldProps {
  className?: string;
  onChanged(value: any): void;
  value: any;
}

export class InputField extends React.PureComponent<
  InputFieldProps,
  { displayValue: any; defaultValue: any; isDirty: boolean }
> {
  render() {
    const { className, onChanged, onKeyDown, value, ...textFieldProps } = this.props;

    return (
      <TextField
        {...textFieldProps}
        value={value}
        className={className}
        onChange={this._onChange}
        onBlur={this._onBlur}
        onKeyDown={this._onKeyDown}
      />
    );
  }

  private _onChange = event => {
    const nextValue = event.target.value;
    this.props.onChanged(nextValue);
  };

  private _onBlur = event => {
    const nextValue = event.target.value;
    this.props.onChanged(nextValue);
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
