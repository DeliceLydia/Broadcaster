import users from '../data/usersData';


    
    const findUser = (email) => {
        const user = users.find(u => u.email === email);
        return user;
    };
    const findUsername = (username) =>{
        const Username = users.find(u => u.username === username);
        return Username;
    }
    module.exports ={
        findUser,  findUsername
    };
