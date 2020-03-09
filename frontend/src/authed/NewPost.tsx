import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import SubmitInput from "../shared/SubmitInput";

const TextInput = styled.input`
    width: 100%;
    height: 100px;    
    border: 1px solid rgba(0, 0,0,0.1);
    border-radius: 2px;

    &:focus{
        outline: none;
    }
`;


const StyledForm = styled.form`
    margin: 20px 0;
    padding: 0;
`;

const NewPost: React.FunctionComponent<{}> = () => {
    const [text, setText] = React.useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("/api/newPost", { text: text }, { withCredentials: true })
            .then(res => {
                console.log(res.data.payload);
                setText("");
            })
            .catch(e => {
                console.error("Issue with submitting new post.");
                console.error(e)
            });
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TextInput
                onChange={handleChange}
                name="text"
                value={text}
                placeholder="Your thoughts go here.">
            </TextInput>
            <SubmitInput type="submit" value="Post" />
        </StyledForm>
    );
}

export default NewPost
