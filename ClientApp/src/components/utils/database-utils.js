import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';

const baseUrl = "http://localhost:52937/";


export const getTwitterHandlesByUser = async (props)=>{
    let authHeaders = await getAuthHeadersSilent(props.msalConfig);
    let handles = await axios.get(baseUrl + "api/get-distinct-handles", authHeaders);
    handles.data.unshift("");
    return handles;
}