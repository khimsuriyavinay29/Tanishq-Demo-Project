
const rusers= document.getElementById("registered-users");


async function fetchRegisteredUsers() {
    try {
        const response = await fetch("http://localhost:4500/api/user/find",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzkxYzg0ZjBiYTNkMTM4NTgzOTQ0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTIyNTE4MSwiZXhwIjoxNzE5NjU3MTgxfQ.0BOXlwh_I3mizUZuq_xvYtE_q1uepNZN-uvOTFJ9QFg'
                
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const json = await response.json();
        console.log(json);

        
        rusers.innerHTML = '';
        json.forEach(user => {
            const userElement = document.createElement('div');
            const userId = document.createElement("h2");
            const username = document.createElement("h3");
            
            userId.innerHTML = `User ID : ${user._id}`;
            username.innerHTML = `User Name : ${user.userName}`;

            userElement.appendChild(userId);
            userElement.appendChild(username);

            
        
           
            rusers.appendChild(userElement);
        });

    } catch (error) {
        console.error('Error fetching registered users:', error);
    }
}


fetchRegisteredUsers();