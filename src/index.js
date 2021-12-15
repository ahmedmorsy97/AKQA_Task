const choosenMenuItems = {
    first: "Bedingungens",
    second: "Diavonex",
    third: "Overview"
}
const menuData = {
    "Bedingungen": {
        "Adtralza": [
            "Overview",
            "Mode of Action",
            "Efficacy",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Diavonex": [
            "Overview",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Diavobet": [
            "Overview",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Enstilar": [
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Fucidin": [
            "Overview",
            "Mode of Action",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Kyntheum": [
            "Overview",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Protopic": [
            "Overview",
            "Mode of Action",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Skinoren": [
            "Overview",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Tralokinumab": [
            "Overview",
            "Mode of Action",
            "Efficacy",
            "Quality of Life",
        ],
        "Xamiol": [
            "Overview",
            "Mode of Action",
            "Efficacy",
        ],
    },
    "Bedingungens": {
        "Diavonex": [
            "Overview",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Diavobet": [
            "Overview",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Enstilar": [
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Fucidin": [
            "Overview",
            "Mode of Action",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Kyntheum": [
            "Overview",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Protopic": [
            "Overview",
            "Mode of Action",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
    },
    "Veranstaltungen": {
        "Adtralza": [
            "Overview",
            "Mode of Action",
            "Efficacy",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Diavonex": [
            "Overview",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Diavobet": [
            "Overview",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Enstilar": [
            "Dosing",
            "News",
            "Technical Information",
        ],
    },
    "Werkzeuge": {

        "Diavobet": [
            "Overview",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Enstilar": [
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Fucidin": [
            "Overview",
            "Mode of Action",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Kyntheum": [
            "Overview",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Protopic": [
            "Overview",
            "Mode of Action",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Skinoren": [
            "Overview",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Tralokinumab": [
            "Overview",
            "Mode of Action",
            "Efficacy",
            "Quality of Life",
        ],
        "Xamiol": [
            "Overview",
            "Mode of Action",
            "Efficacy",
        ],
    },
    "Forschung und Erkenntnisse": {

        "Protopic": [
            "Overview",
            "Mode of Action",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Skinoren": [
            "Overview",
            "Quality of Life",
            "Safety",
            "Dosing",
            "News",
            "Technical Information",
        ],
        "Tralokinumab": [
            "Overview",
            "Mode of Action",
            "Efficacy",
            "Quality of Life",
        ],
        "Xamiol": [
            "Overview",
            "Mode of Action",
            "Efficacy",
        ],
    },
}

const chooseNav = (name, id) => {
    [].slice.call(document.getElementById(id).children).forEach(el => {
        el.className = el.className.replace("active", "")
    })
    document.getElementById(`${id}${name}`).className += "active";

    if (id == "firstNav") {
        choosenMenuItems.first = name.split("_").join(" ");
        settleMenuItems(true, true)
    } else if (id == "secondNav") {
        choosenMenuItems.second = name.split("_").join(" ");
        settleMenuItems(true)
    } else {
        choosenMenuItems.third = name.split("_").join(" ");
    }
}

const createMenuItem = (menuHolder, type, el, index) => {
    const id = el.split(" ").join("_");
    const menuItem = document.createElement("a");
    menuItem.id = `${menuHolder}${id}`;
    menuItem.onclick = () => {
        chooseNav(id, `${menuHolder}`)
    }
    menuItem.innerHTML = el;
    if (index == 0) {
        choosenMenuItems[type] = el;
        menuItem.className = "active";
    }
    return menuItem;
}

const settleMenuItems = (third = false, second = false, first = false) => {
    if (first) {
        const firstMenu = document.getElementById("firstNav");
        const firstMenuData = menuData;
        const firstMenuDataKeys = Object.keys(firstMenuData);
        // remove children
        firstMenu.innerHTML = '';
        firstMenuDataKeys.forEach((el, index) => {
            const menuItem = createMenuItem('firstNav', "first", el, index);
            firstMenu.append(menuItem);
        })
    }

    if (second) {
        const secondMenu = document.getElementById("secondNav");
        const secondMenuData = menuData[choosenMenuItems.first];
        const secondMenuDataKeys = Object.keys(secondMenuData);
        // remove children
        secondMenu.innerHTML = '';
        secondMenuDataKeys.forEach((el, index) => {
            const menuItem = createMenuItem('secondNav', "second", el, index);
            secondMenu.append(menuItem);
        })
    }


    if (third) {
        const thirdMenu = document.getElementById("thirdNav");
        const thirdMenuData = menuData[choosenMenuItems.first][choosenMenuItems.second];

        // remove children
        thirdMenu.innerHTML = '';
        thirdMenuData.forEach((el, index) => {
            const menuItem = createMenuItem('thirdNav', "third", el, index);
            thirdMenu.append(menuItem);
        })
    }
}

//
settleMenuItems(true, true, true);
