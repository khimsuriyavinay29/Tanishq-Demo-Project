document.addEventListener("DOMContentLoaded", async () =>{

    const userLoginToken = localStorage.getItem("accessTokenuser");
    const userId = localStorage.getItem("userLoginId")
    const userName = localStorage.getItem("userLoginName")

    try {
        const deletedUser = await fetch(`http://localhost:4500/api/user/${userId}`,{
            method : "POST",
            headers :{
                'content-type' : 'application/json',
                'Authorization': `Bearer ${userLoginToken}`
            },
            body : JSON.stringify({username:userName})
        })
    
        console.log(deletedUser);
    
    
        if (!deletedUser.ok) {
          console.log(deletedUser);
          throw new Error('Network response was not ok');
        }
    
        const data = await deletedUser.json();
        console.log('Success:', data); 
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }

    
})