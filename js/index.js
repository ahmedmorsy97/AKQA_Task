const chooseNav = (index, id) => {
    console.log(index, id);   
    document.getElementById(id).children.forEach( el => {
        console.log(el.classList);
        el.className = el.className.replace("active", "")
    }) 
}

// document.onreadystatechange()