const Vec3 = require("vec3")
const createCircle = (r, pta, h) => {
    return require("./circle")(r, pta, h)
}
module.exports = (height, radius, posToAdd, hollow) => {
    let positions = []
    for (let i = 0; i < height; i++) {
        let x = posToAdd.x, y = posToAdd.y, z = posToAdd.z
        const circle = createCircle(radius, new Vec3(x, y+i, z), hollow)
        circle.forEach(pos => positions.push(pos))
    }
    return positions
}