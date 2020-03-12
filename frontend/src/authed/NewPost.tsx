import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import SubmitInput from "../shared/SubmitInput";
import { PostResult } from "../../types/index";

const TextInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 100px;    
    border: 1px solid rgba(0, 0,0,0.1);
    border-radius: 2px;
    padding: 20px;
    font-size: 16px;
    margin-bottom: 20px;

    &:focus{
        outline: none;
    }
`;

const TitleInput = styled(TextInput)`
    height: 50px;
`;

const StyledForm = styled.form`
    margin: 20px 0;
    padding: 0;
`;

interface Props {
    updatePosts: (latest: PostResult) => void
}

const NewPost: React.FunctionComponent<Props> = ({ updatePosts }: Props) => {
    const [text, setText] = React.useState<string>();
    const [title, setTitle] = React.useState<string>(`Status for ${new Date().toLocaleDateString()}`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            text: text, title: title,
        };

        setTitle("");
        setText("");

        ///TODO: mr8/20 make it so that it doesn't block when submitted.
        // TODO: do a modal here to say 'thanks for your contribution'
        // TODO: do a notification if it fails.        


        axios.post("/api/newPost", payload, { withCredentials: true })
            .then(res => {
                console.log("POST Payload Response");
                console.log(res.data);
                console.log("POST Payload END");
                const { name, content, created_at } = res.data.payload[0];
                updatePosts({ name: name, content: content, created_at: created_at });
            })
            .catch(e => {
                console.error("Issue with submitting new post.");
                console.error(e)
            });
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TitleInput
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="A title for your thoughts?" />
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
