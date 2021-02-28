// import React, {useEffect, useState} from 'react';
// import './UserDeatails.css';
// import {useCookies} from "react-cookie";

// export default function UserDeatils(props) {
//     const [client,setClient] = useState("")
//     const [cookies] = useCookies(['user']);

//     useEffect(() => {
//         fetch(`https://localhost:3000/api/users/${props.wine.ClientID}`, { withCredentials: true, credentials: 'include' })
//             .then(response => response.json())
//             .then(result =>  {
//                 setClient(result)
//                 console.log(client)
//         })
//     }, [client])

//     return (
//         <div>
//             <div className={"rowImg"}>
//                 <div className={"coulmn"}>            
//                     <h1>{client.firstName},{client.lastName}</h1>
//                     <span>{renter.JobTitle}</span>
//                     <div>
//                         <h4>Budget:</h4>
//                         <span>{renter.Budget}</span>
//                     </div>
//                 </div> 
//                 <img src={renter.ImageUrl} alt="profile"/>
//             </div>
//             <div className={"firstDeatils"}>
//                 <div>
//                     <h4>Gender: </h4>
//                     <span>{renter.Gender}</span>
//                 </div>
//                 <div>
//                     <h4>Age:</h4>
//                     <span>{renter.Age}</span>
//                 </div>
//                 <div>
//                     <h4>Country: </h4>
//                     <span>{renter.Country}</span>
//                 </div>
//             </div>
//             <div className={"row"}>
//                 <h4>Phone: </h4>
//                 <span>{renter.Phone}</span>
//             </div>
//             <div className={"row"}>
//                 <h4>Email: </h4>
//                 <span>{renter.Email}</span>
//             </div>
//         </div>
//     );
// }