import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import Editor from "@monaco-editor/react";
import Input from '@material-ui/core/Input';
import './Post.css';
import Navbar_code from "../navbar/Navbar-code";
import Axios from 'axios';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {goToHome} from "../../services/routing.service";
import  {sendData} from "../../services/posts.service";
import {Modal,Backdrop, Box,styled} from '@mui/material';


const style = {
  position: 'absolute',
  border:'5%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: ' #E5ECF8',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function AddPost() {
    const user = window.localStorage.getItem("currentUser");
    const token = JSON.parse(user).accessToken;
    const [caption, setCaption] = useState("");
    const [userLang,setUserLang] = useState("Python");
    const [username, setUsername] = useState(JSON.parse(user).username)
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [userCode, setUserCode] = useState("");
    const [code, setCode] = useState("");
    const editRef = useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditorDidMount = (editor,monaco) => {
        editRef.current = editor;
        setUserCode(editRef.current.getValue());
    }



    const handleUpload = () => {
                        setCaption("");
        console.log(editRef.current.getValue());

    }

    function postCode(){
                    Axios.post("http://localhost:8080/api/posts", {
                                name : username,
                                code: userCode,
                                language: userLang,
                                caption: caption,
                                like: 0,
                                originName: username,
                                });
       return goToHome();
    }

    function postSaveCode(){
        Axios.post("http://localhost:8080/api/SavePosts", {
            myPseudo : username,
            name : username,
            code: userCode,
            language: userLang,
            caption: caption,
            like: 0,
            originName: username});
        return goToHome();
    }

    function compile() {
        if (userCode === ``) {
            return
        }

        // envoie la sauce
        Axios.post(`https://serverpa.herokuapp.com/compile`, {
            code: userCode,
            language: userLang,
            input: userInput}).then((res) => {
            if(res.data.success) {
                setUserOutput(res.data.output);
                setOpen(true);
            }else{
                setUserOutput(res.data.error);

            }
        }).catch((error)=>{
            console.log(error)
        })

    }

    function clearOutput() {
        setUserOutput("");
    }

    return (
      <Grid justifyContent="center" container spacing={2}>
       <Grid item xs={8} sx={{marginTop:"100px"}}>
            <h3 className="text"> Click here to publish your post </h3>
            <Button onClick={() => postCode()}> Publish </Button>
           <Button onClick={() => postSaveCode()}> Save </Button>
        </Grid>
        <Grid item xs={8} >
        <Card sx={{  marginTop: '20px'}}>
            <div className="App" >
                <Card sx= {{marginBottom:"20px"}}>
                    <Input
                            className="post_caption"
                            type="text"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
               </Card>
                <Navbar_code
                    userLang={userLang} setUserLang={setUserLang}

                />

                <div className="main">
                    <div className="left-container">
                        <Editor

                            padding={15}
                            style={{

                                fontSize: 12,
                                backgroundColor: "#000000",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                            theme="vs-dark"
                            language={userLang}
                            defaultLanguage={"Python"}
                            defaultValue={"# Enter Your Code Here ..."}
                            value={code}
                            onChange={(value) => { setUserCode(value) }}
                        />
                        <button className="run-btn" onClick={() => compile()}>
                            Run
                        </button>

                        <div className="right-container">
                            <h4>Input:</h4>
                            <div className="input-box">
            <textarea id="code-inp" onChange=
                {(e) => setUserInput(e.target.value)}>
            </textarea>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

                <Modal
                  onClose={handleClose}
                  open={open}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
          <Box sx={style} >
                  <pre style={{minHeight:"200px", backgroundColor:" #E5ECF8",color:"black"}}>{userOutput}</pre>
                    <button onClick={() => { clearOutput() }}
                          className="clear-btn">
                               Clear
                                 </button>
          </Box>
        </Modal>

        </Card>
       </Grid>
      </Grid>
    );
}

export default AddPost;