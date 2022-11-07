import "./SavePost.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Post from "../post/Post";
import {Backdrop, Box, Modal} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
function SavePost() {
    const [posts, setPosts] = useState ([]);
    const [user, setUsers] = useState([]);
    const { username } = useParams();
    const name = username;

    useEffect(() => {
            fetchPosts();
            fetchUsers();
        },
        []);
    const fetchUsers = async  ()=>{
        const userResponse = await axios.get('http://141.94.245.122:8081/api/users/getByUsername/'+name);
        setUsers(userResponse.data);


    }
    const fetchPosts= async()=>{
        const postResponse = await axios.get('http://141.94.245.122:8081/api/SavePosts/user/'+name);
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
                                {user.username}
                            </h1>
                        </div>
                    </div>
                    <button className="text_post"><strong>{posts.length}</strong> Save posts </button>

                </Card>
            </Grid>
            <Grid item xs={8} sx={{marginTop:"20px"}}>

                {
                    posts && posts.map(post => (

                            <Post username={post.name} language={post.language} caption={post.caption} code={post.code} like={post.likeCount} savePostId={post.savePostId} myPseudo={post.myPseudo} originName={post.originName} originId={post.originId}/>

                        )
                    )}
            </Grid>

        </Grid>
    </div>
    );
}

export default SavePost;