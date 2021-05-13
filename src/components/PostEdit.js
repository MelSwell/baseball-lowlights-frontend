import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PostCard from './PostCard'


function PostEdit(){

    const { id } = useParams();
    const [postData, setPostData] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        media_link: "",
        media_type: "image/gif",
        team1: "",
        team2: "",
        description: "",
        user_id: window.sessionStorage.getItem("currentUserId")
    })

    const teams = ['Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox','Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Indians','Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals','Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers','Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics','Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants','Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers','Toronto Blue Jays','Washington Nationals']
    const teamSelectOptions = teams.map((team, index) => <option key={team + index} value={team}>{team}</option>)


    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            setPostData([data])
            setFormData(data)
        })
    }, [])

    console.log(postData)

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){}

    const postCards = postData.map((post) => {
        return (
            <div className="post-cards-container">
                <PostCard key={post.id} {...post}/>
            </div>
        )
      })


    return(
        <div>
            <h1> {id} </h1> 

            {postCards}

            <form onSubmit={handleSubmit}>
                <label>Title: </label><br/>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/><br/>
                <label>Post Type: </label><br/>
                    <select name="media_type" onChange={handleChange}>
                        <option value="image/gif">Image/Gif</option>
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                    </select><br/>
                <label>Team1 (required): </label><br/>
                    <select name="team1" onChange={handleChange}>
                        {teamSelectOptions}
                    </select><br/>
                <label>Team2 (optional): </label><br/>
                    <select name="team2" onChange={handleChange}>
                        {teamSelectOptions}
                    </select><br/>
                <label>Media Link: </label><br/>
                    <textarea name="media_link" value={formData.media_link} onChange={handleChange}/><br/>
                <label>Description: </label><br/>
                    <textarea name="description" value={formData.description} onChange={handleChange}/><br/>
                <input type="submit" />
            </form> 

                                
        </div>
    )


};

export default PostEdit;