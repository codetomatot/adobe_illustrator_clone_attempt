import React, { useState, useEffect } from 'react'
import { Dropdown, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcSimCard } from 'react-icons/fc';
import { FcImport } from "react-icons/fc";
import { AiOutlineCaretDown } from "react-icons/ai";
import firebase from "../firebase-config";
require("firebase/firestore");

function Navbar(props) {
    const [menu, setMenu] = useState(false);
    function toggle() { setMenu(!menu)}
    // console.log(props);
    return (
        <div>
            <div className="bar">
                <nav>
                  <ul>
                    <button style={{backgroundColor: 'transparent', border: 'none', 
                    padding: '0',
                    zIndex: '1',
                    marginRight: '25px',
                    marginLeft: '15px',
                    position: 'relative',
                    top: '100px',
                    color: '#fff'}} onClick={toggle}>File <AiOutlineCaretDown/></button>
                    {menu ?
                    <div className="dropdn-menu">
                        <label htmlFor="importImage" className="import"><FcImport /> Import
                            <input type="file" id="importImage" onChange={props.fileEvent} style={{display: 'none'}} />
                        </label>
                        <div onClick={props.saveEvent}><FcSimCard /> Save</div>
                    </div>
                    : null }
                    <Dropdown>
                      <Dropdown.Toggle>Edit</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>Name</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>Object</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>Name</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>Type</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>Name</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>Select</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>Name</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>Effect</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>Name</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>View</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>Name</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>Window</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item >
                          <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>Home</Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle>Help</Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>
                          Home
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ul>
                </nav>
              </div>
        </div>
    )
}

export default Navbar
