import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStyles, EditableMathField } from 'react-mathquill';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles()

function AnswerInput() {
    const [latex, setLatex] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setAnswer(latex);
        navigate('/leaderboard'); // redirect to leaderboard
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="answer-input-form">
                <Form.Label>answer:</Form.Label>
                <br />
                <EditableMathField style={{ padding: '0.75rem' }}
                    latex={latex}
                    onChange={(mathField) => {
                        setLatex(mathField.latex())
                    }}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                submit
            </Button>
        </Form>
    )
}

export default AnswerInput;