import Post from "../post/Post";
import React, {useState, useEffect,componentDidMount} from 'react';
import CodeUpload from "../post/AddPost.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import axios from "axios";
import {goToAddPost} from "../../services/routing.service";

function Home(){
    const [posts, setPosts] = useState ([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
           fetchPosts();
           fetchUsers();
        },
        []);



    const fetchPosts= async()=>{
        const postResponse = await axios.get('http://192.168.1.82:8080/api/posts');
        setPosts(postResponse.data);

    }
    const fetchUsers=async()=>{
        const userResponse = await axios.get('http://192.168.1.82:8080/api/users');
        setUsers(userResponse.data);
    }
    return(
        <div className="home">

            <div className="posts">
                <Grid justifyContent="center" container spacing={2}>
                    <Grid item xs={8} sx={{marginTop:"100px"}}>

                            <h3 className="text"> Do you want to add a post with your own code solution ? </h3>
                            <Button onClick={goToAddPost}>Click Here</Button>


                    </Grid>
                    
                    <Grid item xs={8}>
                {
                    posts && posts.map(post => (

                    <Post username={post.name} language={post.language} caption={post.caption} comments={post.comments} code={post.code} like={post.likeCount} id={post.id} originName={post.originName} originId={post.originId} setpost={setPosts}/>

                        )
                    )}

                </Grid>
                </Grid>
            </div>
            
        </div>
    );
}

export default Home;