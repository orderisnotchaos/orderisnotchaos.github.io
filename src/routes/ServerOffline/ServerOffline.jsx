
import serverOfflinePic from '../../assets/images/new-business-server-error.jpg';

import './ServerOffline.css';
export default function ServerOffline(){


    return(
        <>
            <img className= "server-offline-pic" src={serverOfflinePic} alt="server offline"></img>
        </>
    );
}