import React from 'react'; 

import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({CreateAccountFunction}){
    return (
    <div>
        Create Account
        <CreateAccountForm CreateAccountFunction={CreateAccountFunction}/>
    </div>
    );
}

export default CreateAccount;