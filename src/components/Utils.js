import Config from './Config';
import AppDispatcher from '../dispatcher/AppDispatcher';
function postService(serviceId,data,actionConstant){
    
    fetch(Config.SERVER_IP+':3000/serviceMobile?serviceId='+serviceId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'same-origin' //TODO handle for cross site
            },
            body: JSON.stringify(data)
        }).then(function(res){ return res.json(); })
.then(function(data){
    AppDispatcher.handleAction({
            actionType: actionConstant,
            data: data
          });
     });
}
module.exports ={postService:postService};