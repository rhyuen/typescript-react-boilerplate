import * as React from "react";

interface Props {}
interface State {
  text: string;
}

export default class Form extends React.Component<Props, State> {
  state = { text: "" };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    console.log("submitted");
    this.setState({
      text: ""
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      text: e.target.value
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="text"
          name="formComponent"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <br />
        <input type="submit" value="Execute" />
      </form>
    );
  }
}
