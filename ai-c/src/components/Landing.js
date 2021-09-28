import React from 'react';
import ReactDOM from 'react-dom'
import "./style/land.css";
import { BsInfoCircle } from 'react-icons/bs';
import Logo from "./images/Group 1ainw.svg";
import { RiArrowDownLine } from 'react-icons/ri';
import { IoOptions } from 'react-icons/io5';
import { IoGridOutline } from 'react-icons/io5';
import { IoDocumentOutline } from 'react-icons/io5';
import { FaPaintBrush } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { BsPhone } from 'react-icons/bs';
import { BsFillCollectionPlayFill } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import * as HiIcons from "react-icons/hi";

import firebase, { db } from '../firebase-config';
import { CSSTransition } from 'react-transition-group';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchUser, fetchUserDocuments } from "../redux/actions/actions";
import { bindActionCreators } from 'redux'
//img preview imports
import white from './images/white.jpg';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setup: false,
            customDoc: false,
            nameInput: false,
            docOptions: false,
            docs: null,
            docDisplayType: false,
            loaded: false,
            filteredDocs: [],
        }
        this.logout = this.logout.bind(this);
        this.close = this.close.bind(this);
        this.createNewFile = this.createNewFile.bind(this);
        this.customChosen = this.customChosen.bind(this);
        this.presetOneChosen= this.presetOneChosen.bind(this);
        this.createPresetFileToDb = this.createPresetFileToDb.bind(this)
        this.createFileToDb = this.createFileToDb.bind(this);
    }
    
    logout = () => {
        firebase.auth().signOut();
    }
    
    close = () => {
        this.setState({setup: false});
    }
    

    customChosen = () => {
        console.log("custom document selected");
        this.setState({customDoc: !this.state.customDoc});
        if(this.state.nameInput !== false) {
            this.setState({nameInput: false});
        }
    }
    presetOneChosen = () => {
        this.setState({nameInput: !this.state.nameInput});
        if(this.state.customDoc !== false) {
            console.log(true);
            this.setState({
                customDoc: false,
            })
        } else {
            console.log(false);
        }
    }
    createPresetFileToDb = () => {
        console.log(document.getElementById("title-custom").value)
        if(document.getElementById("title-custom").value !== null) {
            firebase.firestore()
            .collection("documents")
            .doc(firebase.auth().currentUser.uid)
            .collection("userDocs")
            .add({
                documentName: document.getElementById("title-custom").value,
                width: document.getElementsByClassName("width")[0].innerHTML,
                height: document.getElementsByClassName("height")[0].innerHTML,
                docColorType: document.getElementById("select-color").value,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("file in db")
            }).catch((error) => {
                console.error(error);
            })
        } else {
            console.log("null??")
        }
    }

    createFileToDb = () => {
        var docName = document.getElementById("title-custom").value; //get values
        var specifiedWidth = document.getElementById("doc-width").value;
        var specifiedHeight = document.getElementById("doc-height").value;
        var colorType = document.getElementById("select-color").value;

        parseInt(specifiedWidth); //transform strings to integers
        parseInt(specifiedHeight);
        
        firebase.firestore().collection("documents")
        .doc(firebase.auth().currentUser.uid)
        .collection("userDocs")
        .add({
            documentName: docName,
            width: Number(specifiedWidth), //firebase-firestore method for converting the type of value in the firestore databse
            height: Number(specifiedHeight),
            docColorType: colorType,
            creation: firebase.firestore.FieldValue.serverTimestamp() // it is possible that this is necessary in order to use "orderBy" when getting data
        }).then((docRef) => {
            console.log("file in database\nDocument id: ", docRef.id);
        }).catch(() => {
            console.log("failed");
        })
    }

    createNewFile = () => {
        this.setState({setup: !this.state.setup})
        //this.setNewFile();
    }
    fetchDocuments = (search) => {
        const input = document.getElementById("searchIndex");
        // console.log(search);
        firebase.firestore()
        .collection('documents')
        .doc(firebase.auth().currentUser.uid)
        .collection("userDocs")
        .where('documentName', '>=', input.value)
        .get()
        .then((snapshot) => {
            let docs = snapshot.docs.map((doc) => {
                const data = doc.data();
                const docId = doc.id;
                return { docId, ...data }
            });
            // console.log(docs)
            this.setState({
                filteredDocs: [docs]
            })
            if(input.value === "" || input.value === null) {
                this.setState({
                    filteredDocs: [],
                })
            } else {
                console.log(input.value);
                console.log(this.state.filteredDocs)
            }
        })
    }

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserDocuments();
        // this.waitForData();
    }
    

    render() {
        const { filteredDocs } = this.state;
        // console.log(filteredDocs)
        return (
            <div className="landpage">
                <div className="sidenav">
                    
                    <br />
                    <br />
                    <div className="ex-text" onClick={this.setNewFile}>Home</div>
                    <div className="ex-text">Learn</div>
                    <p>Your Work</p>
                    <div className="ex-text">Saved</div>
                    
                    <div className="btn0" onClick={this.createNewFile}>Create New</div>
                    <div className="btn1">Open</div>
                    
                    <button onClick={this.logout} className="btn1 logout" style={{height:"40px"}}>Logout</button>
                </div>
    
                <div className="top-txt-container">
                    <h3>Build your skills <BsInfoCircle /></h3>
                    
                </div>
                <hr />
     
                <div className="all-content">
                    <div className="canvas-options">
                        <div>
                            <IoDocumentOutline style={{fontSize: '50px'}} />
                            <p>letter</p>
                            <p style={{fontSize:'10px'}}>793px * 1122px</p>
                        </div>
                        <div>
                            <FaPaintBrush style={{fontSize: '50px'}} />
                            <p>postcard</p>
                            <p style={{fontSize:'10px'}}>1976 * 1016mm</p>
                        </div>
                        <div>
                            <CgWebsite style={{fontSize: '50px'}} />
                            <p>common</p>
                            <p style={{fontSize:'10px'}}>1920px * 1280px</p>
                        </div><div>
                            <BsPhone style={{fontSize: '50px'}} />
                            <p>phone</p>
                            <p style={{fontSize:'10px'}}>1125px * 2436px</p>
                        </div><div>
                            <BsFillCollectionPlayFill style={{fontSize: '50px'}} />
                            <p>HDV</p>
                            <p style={{fontSize:'10px'}}>1920px * 1280px</p>
                        </div><div>
                            <CgMoreO style={{fontSize: '50px'}} />
                            <p>more presets</p>
                        </div>
                        
                    </div>
                    <div className="new-stuff">
                        <img src={Logo} style={{width: '100%', height: '150px'}} alt="whats new" />
                        <h3>check out what's new</h3>
                        <button>View in the app</button>
                    </div>
    
                    <div className="documents">
                        <h3>recent</h3>
                        
                        <button className="layout">
                            <IoOptions style={{display: 'inline'}} />
                        </button>
                        <button className="layout">
                            <IoGridOutline style={{display: 'inline'}} />
                        </button>
    
                        <div style={{display: 'inline',
                            marginRight: '15px',
                            color:'#f5f5f563',
                            position: 'relative',
                            top: '20px'}}
                        >Sort</div>
                        <select>
                            <option>Recent</option>
                        </select>
                        <div className="blok"></div>
                        <div style={{display: 'inline', fontSize: '20px', position: 'relative', top: '25px', color: '#fff'}}><RiArrowDownLine /></div>
    
                        <div className="search-docs">
                            <span>Filter</span><input id="searchIndex" placeholder="filter recent files" onChange={(search) => this.fetchDocuments(search)} />
                        </div>
                        <div id="filtered-docs">
                            {filteredDocs.length !== 0 ? 
                            <div className="result">
                                {/* {filteredDocs.length > 1} e.g*/}
                                <p className="writeto">{filteredDocs[0][0].documentName}</p>
                            </div>
                            : 
                            <div className="wf">
                                {this.props.userDocs.map((item, index) => {
                                    return (
                                        <Link to={{
                                            pathname: "/illustrator",
                                            state: {
                                                documentName: item.documentName,
                                                width: item.width,
                                                height: item.height,
                                                dcc: item.docColorType,
                                                id: item.id,
                                                canvasState: item.canvasState,
                                            }
                                        }} key={index}>
                                            <div className="result">
                                                <p className="writeto" style={{color: '#fff', textDecoration: ''}}>{item.documentName}</p>
                                                {item.screenshot && item.screenshot !== null ? 
                                                <img src={item.screenshot} alt="preview" className="previewImg" />
                                                :
                                                <img src={white} alt="default" className="previewImg" /> 
                                                }
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>}
                            
                        </div>
                    </div>
                </div>
    
                
                <div className="content-load">
                    <div className="loading-circle">
                        <div className="half-part"></div>
                    </div>
                </div>
    
                {this.state.setup ? <div className="modal-bg">
                <div className="modal-create-new">
                    <h4>New Document</h4>
                    <span onClick={this.close} style={{display: 'inline'}} ><AiOutlineClose /></span>
                    <div style={{display: 'grid', 
                    gridTemplateColumns: 'repeat(2,0fr)', 
                    gridAutoRows: 'minmax(120p, auto)', placeItems: 'center', width: '100%', height: '100%', padding: 0}}>
                        <div className="doc-options">
                            <div className="new-doc-types">
                                <div className="doc-types" onClick={this.presetOneChosen} >
                                    <CgWebsite style={{fontSize: '80px'}} />
                                    <br/>Web page<br/> 
                                    <span className="width">1920</span>*<span className="height">1280</span>px
                                </div>
                                <div className="doc-types" onClick={this.customChosen}><IoDocumentOutline style={{fontSize: '80px'}} /><br/>Custom<br/>W*H</div>
                            </div>
                        </div>
                        <div className="sidebar-options">
                            {this.state.nameInput ? <div className="custom-settings">
                                <form>
                                    <input id="title-custom" className="custom-doc-title" type="text" placeholder="Document name" required />
                                    <select id="select-color">
                                            <option>RGB</option>
                                            <option>CMYK</option>
                                        </select>
                                </form>
                                <button onClick={this.createPresetFileToDb} className="custom-buttons" style={{
                                        position:'absolute',
                                        bottom:'10px',
                                        right:'20px',
                                        background:'#2E7EE6',
                                        borderRadius:'45px',
                                        border:'2px solid #2E7EE6'}}>Create</button>
    
                                        <button onClick={this.close} className="custom-buttons" style={{
                                        position:'absolute',
                                        bottom:'10px',
                                        right:'120px',
                                        border:'2px solid #f3f3f3',
                                        background:'transparent',
                                        borderRadius:'45px'}}>Close</button>
                            </div> : null}
                            {this.state.customDoc ? 
                            <div className="custom-settings">
                                <div>
                                    <form>
                                        <input id="title-custom" className="custom-doc-title" type="text" placeholder="Document name" required /><br />
                                        <label htmlFor="doc-width">Width (In Pixels)<br />
                                            <input type="text" id="doc-width" required />
                                        </label><br />
                                        <label htmlFor="doc-height">Height (In Pixels)<br />
                                            <input type="text" id="doc-height" required />
                                        </label>
    
                                        <p>Color Mode</p>
                                        <select id="select-color">
                                            <option>RGB</option>
                                            <option>CMYK</option>
                                        </select>
    
                                        
    
                                    </form>
                                    <button onClick={this.createFileToDb} className="custom-buttons" style={{
                                        position:'absolute',
                                        bottom:'10px',
                                        right:'20px',
                                        background:'#2E7EE6',
                                        borderRadius:'45px',
                                        border:'2px solid #2E7EE6'}}>Create</button>
    
                                        <button onClick={this.close} className="custom-buttons" style={{
                                        position:'absolute',
                                        bottom:'10px',
                                        right:'120px',
                                        border:'2px solid #f3f3f3',
                                        background:'transparent',
                                        borderRadius:'45px'}}>Close</button>
                                </div>
                            </div>
    
                             : null}
                        </div>
                    </div>
                </div>
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    //console.log(state); //<-- make sure the state is updating
    return {
        currentUser: state.user.currentUser,
        userDocs: state.user.userDocs,
        //canvasData: state.user.canvasData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        fetchUserDocuments: () => dispatch(fetchUserDocuments()),
        //fetchCanvasData: () => dispatch(fetchCanvasData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

//August 29, 2021 <-- catastrophic failure day