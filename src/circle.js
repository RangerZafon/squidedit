const Vec3 = require("vec3")
module.exports = (radius, posToAdd, hollow) => {
    const numberOfBlocks = radius*6
	const circle = Math.PI*2
    let positions = []
    if (hollow) {
        for (let i = 0; i < numberOfBlocks+1; i++) {
            const angle = circle/numberOfBlocks*i
            const xPos = Math.round(Math.cos(angle)*radius)
            const yPos = Math.round(Math.sin(angle)*radius)
            const pos = new Vec3(xPos+posToAdd.x, posToAdd.y, yPos+posToAdd.z)
            positions.push(pos)
        }
    } else {
        for (let i = 0; i < numberOfBlocks+1; i++) {
            const angle = circle/numberOfBlocks*i
            const xPos = Math.round(Math.cos(angle)*radius)
            const yPos = Math.round(Math.sin(angle)*radius)
            const pos = new Vec3(xPos+posToAdd.x, posToAdd.y, yPos+posToAdd.z)
            positions.push(pos)
        }
        const distanceBetweenParts = radius*2-1
        for (let i = 0; i < distanceBetweenParts+1; i++) {
            const circle = createCircle(i/2, posToAdd, true)
            circle.forEach(pos => positions.push(pos))
        }
    }
    return positions
}