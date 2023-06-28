module.exports = (io)=>{
    var data = []
    var users = 0;
    io.on('connection', (socket)=>{
        console.log('User Connected');
        users = users + 1
        io.emit("new_user", users);
        for (let i = 0; i < data.length; i++) {
            io.emit('show_drawing', data[i]);
        }
        socket.on('drawing', (drawing)=>{
            console.log('Usuario pintando')
            data.push(drawing);
            io.emit('show_drawing', drawing);
        })
        socket.on('reset_drawing',()=>{
            data = []
            io.emit('show_drawing', null);
        })
        socket.on('disconnect', ()=>{
            users = users - 1
            io.emit("new_user", users);
            console.log('User disconnected');
        })
    })
}