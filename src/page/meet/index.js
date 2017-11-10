export default  () => ({
    path: 'meet/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Meet = require('./meet').default;
            cb(null, Meet)
        },'meet')
    }
})

