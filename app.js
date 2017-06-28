// Object with function inside that is called as soon as page loads
const app = {
    init: function(formSelector) {
        this.max = 0
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) 
            // Bind returns a new copy of function set correctly
            // 'This' will be whatever 'this' is now
    }, // Don't forget comma

    // This is a function but still is a property
    handleSubmit: function(ev) { // ev stands for event
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }
        this.max++
    },
}

app.init('form#flick-form') // Run as soon as page loads