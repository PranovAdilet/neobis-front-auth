export const saveToLocalStorage = () => {

    localStorage.removeItem('registrationToken')

    const url = window.location.href

    if (url.length > 50){
        const startEndpoint = url.search('confirmation')

       if (startEndpoint != -1){

           const confirmationToken = url.slice(startEndpoint, url.length)
           localStorage.setItem('registrationToken', confirmationToken )
       }
    }

}