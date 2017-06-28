// Object with function inside that is called as soon as page loads
const app = {
    init: function(formSelector) {
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.handleSubmit)
    }, // Don't forget comma

    // This is a function but still is a property
    handleSubmit: function(ev) { // ev stands for event
        ev.preventDefault()
        const f = ev.target
        console.log(f.flickName.value)
    },
}

app.init('form#flick-form') // Run as soon as page loads