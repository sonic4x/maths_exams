/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default
{
    // if backend and frontend are bind together, you don't need to specify address here. like this:
    // api_server:""
    
    // Otherwise, specify address.
    api_server:"//" +window.location.hostname + ":5555"
    // api_server:"http://127.0.0.1:5555"
    // api_server:"http://10.0.0.18:5555"
    // api_server:"https://maths.deta.dev"
}
