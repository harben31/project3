import React from 'react';
import styled from 'styled-components';
import './style.css';


const Input = styled.input`
    width: 100%;
    height: 42px;
    outline: none;
    margin-top: 10px;
    border: 1px solid rgba(200, 200, 200, 0.3);
    padding: 0px 10px;
    border-radius: 9px;
    border-bottom: 1.4px solid #0000001f;
    transition: all 200ms ease-in-out;
    font-size: 12px;

    &::placeholder {
        color: rgba(200, 200, 200, 1);
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
    }
    
    &:focus {
        outline: none;
        border-bottom: 2px solid rgb(42, 157, 143);
    }
`;


export default function CommentBox() {
    return (
        <div className='commentBox'>
            <span class="material-icons">
                chat
            </span> 
            <Input type='text' placeholder='Add a comment...'/>
            <span class="material-icons">
                send
            </span>
        </div>
    )
};