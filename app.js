// Object with function inside that is called as soon as page loads
const app = {
    init(selectors) {
        this.flicks = [] // New flick name and ID added to array
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) 
            // Bind returns a new copy of function set correctly
            // 'This' will be whatever 'this' is now
    }, // Don't forget comma

    removeFlick(ev) {
       const listItem = ev.target.closest('.flick')
       listItem.remove();
    },

    // Take flick and make item list out of it
    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flick-name')
            .textContent = flick.name
        item
            .querySelector('button.remove')
            .addEventListener('click',this.removeFlick)
/*
        // Favorite button
        let favButton = document.createElement("fav")
        //fav.textContent = flick.name
        let text = document.createTextNode("Favorite")
        favButton.appendChild(text)
        document.body.appendChild(favButton)
        favButton.onclick = function() {
            favorite(item)
        }  */
        return item
    },

    // This is a function but still is a property, appends flick to array
    handleSubmit: function(ev) { // ev stands for event
        ev.preventDefault()
        const f = ev.target
        const flick = { // IDs in the DOM
            id: this.max + 1,
            name: f.flickName.value,
            // ADD: favorite: boolean
        }

        // Add each entered flick to array
        this.flicks.unshift(flick)
        console.log(this.flicks) // Print out array

        const listItem = this.renderListItem(flick)
        // Add flick label to top of list on page
        this.list.insertBefore(listItem, this.list.firstElementChild) // Add flick to top of page list
/*
        // Remove button
        let removeButton = document.createElement("rem")
        let text2 = document.createTextNode("Remove")
        removeButton.appendChild(text2)
        document.body.appendChild(removeButton)
    */
    //    this.flicks.splice(0, 1);
        // removeButton.onclick = function() {
        //     this.list.renderListItem(listItem)
        //    // this.flicks.splice(0, 1);
        // }    
        // REMOVING
        // this.flicks.splice(0, 1);

        this.max++
        f.reset(); // Clears entry field after submitted
    },

}

// Favorite or un-favorite a flick
function favorite(itemName) {
    if(itemName.style.backgroundColor == "palevioletred") {
        itemName.style.backgroundColor = "darkred"
    }
    else {
        itemName.style.backgroundColor = "palevioletred"
    }
}

function remove(itemName) {
    this.flicks.splice()
}

// Run as soon as page loads
app.init({
    formSelector:'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template', // CSS selector for something with multiple classes
}) 