import fetch from 'dva/fetch';

//用来发送ajax请求

const checkStatus=(response)=>{

    if(response.status>=200 && response.status<=200){

      return response;
    }

    const error=new Error(response.statusText);
    error.response=response;
    throw error;
};

export default async function request(url,options={}) {
    
    options.headers={
        'Content-Type':'application/json'
    }
    const response=await fetch(url,options);
    checkStatus(response);
    const data=await response.json();

    return data;
}

