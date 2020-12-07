export default ((arr = [] , func = (item) => item) => {

    let newArr = []
    
    arr.map((item, index, array) => {
        newArr.push(func(item, index, array))
    })

    return newArr;
})