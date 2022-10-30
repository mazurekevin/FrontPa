import Avatar from "@material-ui/core/Avatar";
import React, {useState,useEffect} from 'react';
import "./OriginalPost.css";
import Post from "../post/Post";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import {Modal, Backdrop, Box, styled, CardHeader, CardContent, Typography, CardActions, Collapse} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Button from "@material-ui/core/Button";
import Navbar_code from "../navbar/Navbar-code";
import Editor from "@monaco-editor/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Input from "@material-ui/core/Input";
import Axios from "axios";
import user from "../../store/reducers/User";


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


function OriginalPost() {
    const [posts, setPosts] = useState ([]);
    const user = window.localStorage.getItem("currentUser");
    //const [user, setUsers] = useState([]);
    const { originId } = useParams();
    const name = originId;

    useEffect(() => {
            fetchPosts();
            //fetchUsers();
        });
    /*const fetchUsers = async  ()=>{
        const userResponse = await axios.get('http://localhost:8081/api/'+name);
        setUsers(userResponse.data);


    }*/
    const fetchPosts= async()=>{
        const postResponse = await axios.get('http://localhost:8080/api/posts/'+name);
        setPosts(postResponse.data);

    }
    function createSave(){
        if(originId!=null){
            Axios.post("http://localhost:8080/api/SavePosts", {
                myPseudo : JSON.parse(user).username,
                name : posts.username,
                code: posts.userCode,
                language: posts.userLang,
                caption: posts.caption,
                like: 0,
                originId: posts.originId,
                originName: posts.originName});
        }else{
            Axios.post("http://localhost:8080/api/SavePosts", {
                myPseudo : JSON.parse(user).username,
                name : posts.username,
                code: posts.userCode,
                language: posts.userLang,
                caption: posts.caption,
                like: 0,
                originId: posts.id,
                originName: posts.originName});
        }

    }
    return(
        <div className="profile">
            <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={8} sx={{marginTop:"20px"}}>
                    <Card>
                        <div className="divUser">
                            <div className="username">
                                <h1>
                                    Post Origin
                                </h1>
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={8} sx={{marginTop:"20px"}}>
                    <div className="Blanc">
                        <a href={ `/profile/${posts.name}`}>
                            <Avatar sx={{ bgcolor: "#2878EC" }}  aria-label="recipe"/>
                        </a>
                        {posts.originId!==null&&
                            <div>
                                <Button href={ `/originalPost/${posts.originId}`}>Show original</Button>
                            </div>
                        }
                        <b>{posts.name} / Origin by <a href={ `/profile/${posts.originName}`}>{posts.originName}</a></b>
                    </div>
                    <div className="Blanc">
                        <CardContent >
                            <Typography variant="body2" color="text.secondary">

                                {posts.caption}

                            </Typography>
                        </CardContent>
                    </div>
                    <div className="App">
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
                                    language={posts.language}

                                    value={posts.code}

                                />


                            </div>
                        </div>
                    </div>
                </Grid>





            </Grid>
        </div>
    );
}

export default OriginalPost;
