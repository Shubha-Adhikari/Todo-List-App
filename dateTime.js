const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
const time =  new Date().toLocaleTimeString('en-US',
    {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
    });