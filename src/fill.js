const Vec3 = require("vec3")
module.exports = (pos1, pos2, world, serv, stateIds, plr, playersData, messages) => {
    let fx1 = pos1.x, fx2 = pos2.x
    let fy1 = pos1.y, fy2 = pos2.y
    let fz1 = pos1.z, fz2 = pos2.z
    let x1, x2
    let y1, y2
    let z1, z2
    if (fx1 > fx2) {
        x1 = fx2
        x2 = fx1
    } else {
        x1 = fx1
        x2 = fx2
    }
    if (fy1 > fy2) {
        y1 = fy2
        y2 = fy1
    } else {
        y1 = fy1
        y2 = fy2
    }
    if (fz1 > fz2) {
        z1 = fz2
        z2 = fz1
    } else {
        z1 = fz1
        z2 = fz2
    }
    let blocksCount = 0
    playersData[plr.username].history.undo = []
    for (let x = x1; x < x2+1; x++) {
         for (let y = y1; y < y2+1; y++) {
             for (let z = z1; z < z2+1; z++) {
                blocksCount++
                plr.world.getBlock(new Vec3(x, y, z)).then(block => {
                    playersData[plr.username].history.undo.push(block)
                    serv.setBlock(world, new Vec3(x, y, z), stateIds[Math.floor(Math.random()*stateIds.length)])
                })
             }
        }
    }
    plr.chat(messages.blocksChanged.replace("0", String(blocksCount)))
}