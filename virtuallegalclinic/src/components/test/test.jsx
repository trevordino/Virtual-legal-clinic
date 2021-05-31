import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export default function Test() {
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);

  const handleForm = (event) => {
    event.preventDefault();
    if (nameInput == "") {
      alert("Name is required");
      return;
    }

    var data = {
      'name': nameInput,
      'age': ageInput
    }
  }

    return (
        <div>
            <h1>Test form</h1>
            <form onSubmit={handleForm} >
                <label htmlFor="nameInput">Input your name</label>
                <input type="text" required id="nameInput" value={nameInput} onChange={event => setNameInput(event.target.value)} />
                <label htmlFor="ageInput">Input your age</label>
                <input type="text" required id="ageInput" value={ageInput} onChange={event => setAgeInput(event.target.value)} />
                <button type="submit">Submit Form</button>
            </form>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Click me!
      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Click me!
      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
