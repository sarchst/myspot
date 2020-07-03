import React from "react";
import Post from "../Post";

class FeedPage extends React.Component {
    render() {
        return (
            <div className="FeedPage">
                <Post/>
                <Post/>
                <Post/>
            </div>
        );
    }
}

export default FeedPage;