// Object with function inside that is called as soon as page loads
const app = {
    init: function(formSelector) {
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) 
            // Bind returns a new copy of function set correctly
            // 'This' will be whatever 'this' is now
    }, // Don't forget comma

    renderListItem: function() {
        const item = document.createElement('li')
        item.textContent = flick.name
        return item
    },

    // This is a function but still is a property
    handleSubmit: function(ev) { // ev stands for event
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }
        const listItem = this.renderListItem(flick)
        this.list.appendChild(listItem)
        this.max++
    },
}

app.init({
    formSelector:'form#flick-form',
    listSelector: '#flick-list',
}) // Run as soon as page loads