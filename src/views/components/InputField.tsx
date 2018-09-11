import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';

interface InputFieldProps extends TextFieldProps {
  className?: string;
  onChanged(value: any): void;
}

export class InputField extends React.PureComponent<InputFieldProps, { value: Array<string | number | boolean> | string | number | boolean }> {
  /**
   * to handle empty string, the value is uncontrolled. When props.value changes, it will not change state.
   */
  state = {
    value: this.props.defaultValue || this.props.value || '',
  }

  render() {
    const { className, onChanged, onKeyDown, value, defaultValue, ...textFieldProps } = this.props;

    return (
      <TextField
        {...textFieldProps}
        value={this.state.value}
        className={className}
        onChange={this._onChange}
        onBlur={this._onBlur}
        onKeyDown={this._onKeyDown}
      />
    );
  }

  private _onChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  private _onBlur = () => {
    this.props.onChanged(this.state.value);
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
