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
        const postResponse = await axios.get('http://localhost:8081/api/posts/'+name);
        setPosts(postResponse.data);

    }
    return(
        <div className="profile">
            <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={8} sx={{marginTop:"20px"}}>
                    <Card>
                        <div className="divUser">
                            <div className="username">
                                <h1>
                                    {posts.name}
                                </h1>
                            </div>
                        </div>
                        <button className="text_post"><strong>{posts.length}</strong> posts </button>

                    </Card>
                </Grid>
                <Grid item xs={8} sx={{marginTop:"20px"}}>
                    <a href={ `/profile/${posts.name}`}>
                        <Avatar sx={{ bgcolor: "#2878EC" }}  aria-label="recipe"/>
                    </a>
                    <b>{posts.name} / Origin by <a href={ `/profile/${posts.originName}`}>{posts.originName}</a></b>
                    {posts.myPseudo!==undefined ?(
                        <div>
                            <a href={ `/addPostData/${posts.savePostId}`}>Update</a>
                        </div>
                    ):(
                        <div>

                        </div>
                    )
                    }
                    {posts.originId!=="null" ?(
                        <div>
                            <a href={ `/originalPost/${posts.originId}`}>Show original</a>
                        </div>
                    ):(
                        <div>

                        </div>
                    )
                    }

                    <CardContent >
                        <Typography variant="body2" color="text.secondary">
                            {posts.caption}
                        </Typography>
                    </CardContent>
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
