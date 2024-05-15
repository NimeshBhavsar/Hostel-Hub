import React from 'react'
const show = (str) => {
    console.log("Hello");
    document.querySelector(".roomcleaningwrapper").style.display = "none"
    document.querySelector(".dashboardwrapper").style.display = "none"
    document.querySelector(".complaintwrapper").style.display = "none"
    console.log(str);
    document.querySelector(str).style.display = "inline"
    return (
        <div>


        </div>
    )
}
export default show