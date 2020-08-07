# MySpot

## Description:

MySpot is a social media platform for music lovers who want to connect with other Spotify users. MySpot allows users to share music posts (Spotify playlists, albums, songs), see what their fellow MySpotters are listening to, build playlists, and discover new music. 

## How to start using the app:
MySpot is better with friends! For the best user experience, find and follow other MySpot users by using the search bar and adding them using the follow button on their profiles. Don't know who to add? Why not start with the app creators:
* **mlouie_**
* **quinnird**
* **austin lee**
* **sarchst**

This will populate your Feed and Following pages so you can build your social network and discover new music! You can find more users by checking out our followers/people we follow on our profiles, or by looking through our post comments. 

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
5. Get recommendations based on your likes :heavy_check_mark:
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
We used React to build reusable components for MySpot, for instance ProfileCard, SongList, FollowTable, and Post components are rendered in multiple places across the application. We simulated the familiar multi-page HTML experience with dynamic routing/updating via React Router. React also let us use powerful pre-built components provided by Material-UI.

We used Redux to centrally manage data used across multiple components such as user information, Spotify URIs, and site settings. Redux also allowed us minimize database call frequency by persisting data locally when possible, which reduces load times and improve user experience.

### MongoDB:
We incorporated Mongoose for MongoDB validation and designed Schemas for User, Post, Settings, Comment, and Media. Our database holds a collection of users, and user objects hold references to the other aforementioned models. Our database model was complex due to several self- and mutual schema references _e.g., Users have lists of other Users as followers/following; Users contain Comments which contain Posts which contain User authors_ 

In accordance with best practices, we managed our data in a single collection for better performance, and strove to minimize the size of our database by only storing data when necessary and instead fetching data from 3rd party services _e.g., Spotify API calls and external image hosting_.

### ExpressJS:
MySpot used ExpressJS to create the backend API. We implemented a Model-View-Controller model to improve code readability and organization. We used React Thunk to make the API calls to interact with our database. The Express server is also used to authenticate and obtain access tokens from Spotify during the login process.

### Release Engineering:
MySpot is hosted on Heroku: https://myspotmusic.herokuapp.com/! We utilized a mono-repo and had pull request/code review protocols to aid in a smooth development process.

## Above and Beyond Functionality:
MySpot goes above and beyond the basic requirements by extensively incorporating the Spotify API into our core app functionality. We implemented the ability to view Spotify media such as playlists, albums, favourites. Additionally, we used the Spotify api to add, edit, and remove Spotify media throughout MySpot. We also unified the user's Spotify ID as our own MySpot user ID to make transitioning between calls to the Spotify API and calls to our own API efficient while keeping the data we fetch and update from both consistent throughout our application. 

Further, we improved upon Spotify's own Discover Weekly feature by making it easier and more engaging for users to check out and add Spotify's recommendations via our Tinderify feature. Using Tinderify, MySpotters can swipe through, preview, and add songs from both their and their friends' Discovery Weekly playlists.

## Next Steps:
Future features down the pipeline include the ability to repost and share posts, peer to peer chat, and a live notification system to further build on the social media elements of MySpot. We also want to implement an “Explore Page” to display new and trending posts across all MySpot users so that it's easier to discover new people to follow on the app. Additionally, we would like to improve app security by adding API calls authenticate to our database.

## List of Contributions:
### Mikayla: 
Mikayla contributed to the design of the database structure, model schemas, and wrote a majority of the REST endpoints which interact with the database. She also took a co-lead in designing the Post component and functionality. She connected backend to frontend components via Redux Thunk to bring Profile, Feed, and Settings pages to life and unified app styling for the full-stack experience.

### Sarchen: 
Sarchen’s focus was on integrating the Spotify API into the project. She developed the Tinderify feature, incorporating the user's albums/playlists/songs into the site, and implemented the ability for a user to 'like' songs, adding it to their MySpot playlist.

### Quinn:
Quinn's main contributions were implementing the ability to follow and unfollow users, a MakePost component that lets you post Spotify media onto MySpot, and a ProfileTable component that lets you view and interact with any users playlists, followers, and following lists. Additionally I helped design, implement, and maintain our database, backend structure, models, and schemas.

### Austin:
Austin implemented login, integration between the Spotify API and front-end/database, and dynamic navigation/rendering for profiles and songlists.  He also contributed several behind-the-scenes features such as refactoring components and redux actions to minimize database calls, pioneering several Spotify API-related features, and improving Express server code.   

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
