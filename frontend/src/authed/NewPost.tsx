import * as React from "react";
import styled from "styled-components";

const TextInput = styled.input`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    padding: 20px;
    border: none;

    &:focus{
        outline: none;
    }
`;

const NewPost: React.FunctionComponent<{}> = () => {
    const [text, setText] = React.useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(text);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                onChange={handleChange}
                value={text}
                placeholder="Your thoughts go here.">
            </TextInput>
        </form>
    );
}

export default NewPost
