import React, { useState } from 'react';
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import firebase from "../firebase-config";
import "firebase/firestore";

export default function DisplayImage(props) {
    const imgRef = React.useRef();
    console.log(props);
    const [image] = useImage(props.src);
    //is undefined if the page is reloaded even if the "if" statement is trying to filter it
    function savePosAndScale() {
        if(imgRef !== undefined) {
            var imageNodePos = imgRef.current.absolutePosition();
            firebase.firestore()
            .collection("documents")
            .doc(firebase.auth().currentUser.uid)
            .collection("userDocs")
            .doc(props.parentId)
            .collection("imports")
            .doc(props.currentId)
            .update({
                imgWidth: imgRef.current.width(),
                imgHeight: imgRef.current.height(),
                x: imageNodePos.x,
                y: imageNodePos.y,
            }).then(() => {
                console.log("success updating")
            }).catch((error) => {console.log(error)})
        }
    }
    
    return (
        <React.Fragment>
            <Image
             image={image} 
             width={props.width}
             height={props.height}
             x={props.x}
             y={props.y}
             draggable
             onDragEnd={savePosAndScale}
             name={"image"}
             ref={imgRef}
            />
        </React.Fragment>
    )
}