import React, { useState } from 'react';
import { Stage, Layer, Image, Transformer, Text } from "react-konva";
import useImage from "use-image";
import firebase from "../firebase-config";
import "firebase/firestore";
import "firebase/storage";
// import "konva/lib/shapes/div";

export default function DisplayImage(props) {
    const imgRef = React.useRef();
    // console.log(props);
    const [image] = useImage(props.src);
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
            })
        }
    }
    function deleteImage() {
        firebase.firestore()
        .collection("documents")
        .doc(firebase.auth().currentUser.uid)
        .collection("userDocs")
        .doc(props.parentId)
        .collection("imports")
        .doc(props.currentId)
        .delete()
        .then(() => {
            console.log("the deed is done"); 
            firebase.storage().ref().child(`documentImages/${firebase.auth().currentUser.uid}/${props.parentId}/${props.fileName}`).delete()
            .then(() => console.log("deleted")).catch((er) => console.log(er))
            // window.location.reload()
        })
        .catch(() => console.log("error"))
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
            onDblClick={deleteImage}
        />
        </React.Fragment>
    )
}