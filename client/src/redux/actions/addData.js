import axios from 'axios';


export const ADD_AGENTS = "ADD_AGENTS";
export const ADD_CLIENTS = "ADD_CLIENTS";
export const ADD_COLIS = "ADD_COLIS";
export const ADD_DESTINATION = "ADD_DESTINATION";
export const ADD_EXPEDITION = "ADD_EXPEDITION";
export const ADD_LOCALISATION = "ADD_LOCALISATION";
export const ADD_PAIEMENT = "ADD_PAIEMENT";
export const ADD_USERS = "ADD_USERS";
export const ADD_EMAIL = "ADD_EMAIL";
export const LOGIN = "LOGIN";

const messageError = (res)=>{
    const message = document.getElementById("messageErreur")
    if(res.data.message){
        if(message.textContent){
            message.textContent = `${res.data.message}`
            if(!res.data.validation){
                message.classList.add("errorMessage")
            } else message.classList.add("success")
            
        }else{
            message.innerText = `${res.data.message}`
            if(!res.data.validation){
                message.classList.add("errorMessage")
            } else message.classList.add("success")
        } 
    }
}


export const addAgents = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/agent/create', data).then(res => {
            dispatch({
                type: ADD_AGENTS,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}

export const addClients = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/client/create', data).then(res => {
            dispatch({
                type: ADD_CLIENTS,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}


export const addColis = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/colis/create', data).then(res => {
            dispatch({
                type: ADD_COLIS,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}


export const addDestination = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/destination/create', data).then(res => {
            dispatch({
                type: ADD_DESTINATION,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}


export const addExpedition = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/expedition/create', data).then(res => {
            dispatch({
                type: ADD_EXPEDITION,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}


export const addLocalisation = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/localisation/create', data).then(res => {
            dispatch({
                type: ADD_LOCALISATION,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}


export const addEmails = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/message', data).then(res => {
            dispatch({
                type: ADD_EMAIL,
                payload: data
            });
        }).catch((err) => console.log("message not sent"+err));
    }
}


export const addPaiement = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/paiement/create', data).then(res => {
            dispatch({
                type: ADD_PAIEMENT,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}


export const addUsers = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/users/signup', data).then(res => {
            dispatch({
                type: ADD_USERS,
                payload: data
            });
        }).catch((err) => console.log(err));
    }
}

export const SubmitLogin =(data, setRerender)=>{
    return (dispatch)=>{
        return axios.post('http://localhost:8000/users/singin',data).then((res)=>{
            dispatch({ type : LOGIN, payload : data })
            messageError(res)        
            if(!res.data.error){
                // localStorage.setItem("users", res.data.users.role)
                // localStorage.setItem("noms", res.data.user.noms)
                localStorage.setItem("token", res.data.token)                
                localStorage.setItem("permission", true)
                setRerender(true)
            }
        })
        .catch((error)=> console.log(error))
    }
}