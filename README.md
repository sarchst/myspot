# MySpot

## Description:

MySpot is a social media platform for music lovers who want to connect with other Spotify users. MySpot allows users to share music posts (Spotify playlists, albums, songs), see what their fellow MySpotters are listening to, build playlists, and discover new music. 

## Usage:
For your best instructor/marker expereience, upon logging into to MySpot, please search for and "follow" the following users via the search bar:**"mlouie_"**, **"quinnird"**, **"austin lee"**, and **"sarchst"**. This will populate your Feed and allow you to begin to build your social network! (And grade us).

## Project Task Requirements:

**3-5 minimal requirements (will definitely complete):**
 1. Public profile page :heavy_check_mark:
 2. Follow people :heavy_check_mark:
 3. Log in to your profile to see the playlists of the people you follow :heavy_check_mark:
4.  Edit/View your own playlist :heavy_check_mark:
5.  Search for other users :heavy_check_mark:
    
**3-7 "standard" requirements (will most likely complete)** 
1. Show followers what you’re listening to :heavy_check_mark:
   * See what your followees are listening to  :heavy_check_mark:
2. Dashboard/ Feed :heavy_check_mark:
   * Different types of posts (ie. playlists, songs, artists..) :heavy_check_mark:
   * Share playlists/song/album with others (default post is playlist) onto the Feed :heavy_check_mark:
3. Follower/ Followee Actions :heavy_check_mark:
4. Playlists on web app directly edit your Spotify playlists :heavy_check_mark:
5. Get recommendations based on you like :heavy_check_mark:
6. User-user interaction through comments/chat  :grey_exclamation:

**2-3 stretch requirements (plan to complete 1!)**
1. Tinderify (swipe left or right on randomly generated songs to add them to your playlist) :heavy_check_mark:
2. Priority feed of followee’s activities  :grey_exclamation:
3. Explore page (like IG) :x: 
4. Make playlist on the application from scratch rather than on Spotify :heavy_check_mark:

## Tech Stack:
### HTML/CSS:
HTML/CSS/JS front end rendering is handled by ReactJS and MaterialUI frameworks. Using these libraries made front end development more efficient and helped unifying styling throughout the application.

### React/Redux:
We used React to build reusable components for MySpot, for instance ProfileCard, SongList, FollowTable, and Post components are rendered in multiple places across the application. We simulated the familiar multi-page HTML experience with dynamic routing/updating via React Router. Redux is used to persist user information to reduce database calls.

### MongoDB:
We incorporated Mongoose for MongoDB validation and designed Schemas for User, Post, Settings, Comment, and Media. Our database holds a collection of users, and user objects hold references to the other aforementioned models. In accordance with best practices, we strived to minimize the size of our database by utilizing Spotify API calls and hosting images on an external website, and minimize database calls where possible.

### ExpressJS:
MySpot used ExpressJS to create the backend API. We implemented a Model-View-Controller model to improve code readability and organization. We used React Thunk to make the API calls to interact with our database.

### Release Engineering:
MySpot is hosted on Heroku: https://myspotmusic.herokuapp.com/! We utilized a monorepo and had pull request/code review protocols to aid in a smooth development process.

## Above and Beyond Functionality:
MySpot goes above and beyond the basic requirements by extensively incorporating the Spotify API into our core app functionality. We implemented the ability to … with Spotify. Need help with some extra stuff here.

## Next Steps:
Our future goals include implementing the ability for users to repost and share posts, incorporating a peer to peer chat feature, and implementing a notification system to further build on the social media aspect of MySpot. Additionally, we strive to implement an “Explore Page” where recent and popular posts from users you may not follow are presented so MySpotters can continue to expand their social network. Additionally, we would like to improve app security by forcing the client to authenticate API calls to our database.

## List of Contributions:
### Mikayla: 
Mikayla contributed to the design of the database structure, model schemas, and wrote a majority of the REST endpoints which interact with the database. She also took a co-lead in designing the Post component and functionality. She connected backend to frontend components via Redux Thunk to bring Profile, Feed, and Settings pages to life and unified app styling for the full-stack experience.

### Sarchen: 
Sarchen’s focus was on integrating the Spotify API into the project. She developed the Tinderify feature, incorporating the user's albums/playlists/songs into the site, and implemented the ability for a user to 'like' songs, adding it to their MySpot playlist.

### Quinn:
Quinn's main contributions were implementing the ability to follow and unfollow users, a MakePost component that lets you post Spotify media onto MySpot, and a ProfileTable component that lets you view and interact with any users playlists, followers, and following lists. Additionally I helped design, implement, and maintain our database, backend structure, models, and schemas.

## Previous Project Notes:
### 2 Minimal Requirement Breakdowns:

**Add People I’m Following:**
1. Click “follow” from another user’s profile page to add them to your “People I’m Following” list
2. Add new followee to database
3. Delete followee (unfollow) - either on their profile or from “People I’m Following” list
4. Populate following list from database
5. Display following list on profile (your and others’)
    
**Log In/ Sign Up:**
1. If a new MySpot user has a Spotify account then sign up and populate user info via API/authenticate user credentials.
   * If not, indicate to the new MySpot user that they need a Spotify account to proceed. Provide a link to Spotify’s create new account page. 
3. If an existing MySpot user Login/ Get access to the user’s spotify account via API/authenticate user credentials.
4. Upon successful sign up,redirect to the user’s profile friends list with friend suggestions (potentially based of FaceBook)
5. Upon successful login, redirect user to main Feed

### Prototypes

**Here's what I'm listening to** (Profile Component)
<img src="images/listening-to.png"/>

**Playlist** (Profile Component)
<img src="images/playlist-page.jpeg"/>

**Activity Feed**
<img src="images/feed-sketch.png"/>

**Profile Page**
<img src="images/profile-page.jpg"/>
