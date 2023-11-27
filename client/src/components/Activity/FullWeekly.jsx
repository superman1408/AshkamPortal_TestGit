import React, { useState } from "react";
import { useParams } from "react-router-dom";


import { useDispatch } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";


import { todoList } from "../../action/posts";

const FullWeekly = () => {
  const [state, setState] = useState({
    userInput: "",
    list: [],
  });


  const [comment, setComment] = useState({
    commentText: "",
    comments: '',
  })

  const dispatch = useDispatch();
  const { id } = useParams();





  const addItem = () => {
    if (state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add a user value to list
        value: state.userInput,
      };

      // Update list
      const list = [...state.list];
      list.push(userInput);

      // reset state
      setState({
        list,
        userInput: "",
      });
      console.log(state);
      setComment({state});
      dispatch(todoList(id,comment));
      } else {
        console.log("Error in adding..!!");
    }
  };



  // Function to delete item from list use id to delete
  const deleteItem = (key) => {
    const list = [...state.list];

    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    // Update list in state
    setState({
      ...state,
      list: updateList,
    });
  };



  const editItem = (index) => {
    const todos = [...state.list];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      setState({
        list: updatedTodos,
      });
    }
  };


  // Set a user input value
  const updateInput = (value) => {
    // console.log(value);
    setState({
      ...state,
      userInput: value,
    });
  };



  return (
    <div>
      {/* <strong>To Do List</strong> */}
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        JOB Description
      </Row>
      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={state.userInput}
              onChange={(e) => {
                // e.preventDefault();
                updateInput(e.target.value);
              }}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button
                variant="dark"
                className="mt-2"
                onClick={() => {
                  addItem();
                }}
              >
                ADD
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <ListGroup>
            {/* map over and print items */}
            {state.list.map((item, index) => {
              return (
                <div key={index}>
                  <ListGroup.Item
                    variant="dark"
                    action
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {item.value}
                    <span>
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="light"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => {
                          editItem(index);
                        }}
                      >
                        Edit
                      </Button>
                    </span>
                  </ListGroup.Item>
                </div>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default FullWeekly;
