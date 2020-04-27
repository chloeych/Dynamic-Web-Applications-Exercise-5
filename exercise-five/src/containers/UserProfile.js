import React from 'react'; 
function UserProfile( {userInformation} ){
    return (
    <div>
       <h1>
        User Profile
       </h1>
       <p>User Email: {userInformation.email} </p>
    </div>
    );
}

export default UserProfile;

//Admin URL: https://app.netlify.com/sites/optimistic-goodall-068c37
////URL:       https://optimistic-goodall-068c37.netlify.app
// Site ID:   b5ee0602-2ce1-43a4-89a5-dc5f1a12a555