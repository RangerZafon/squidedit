const Vec3 = require("vec3")
module.exports = (pos1, pos2, world, serv, blocks1, blocks2, plr, playersData, messages) => {
    if (!blocks1) {
        blocks1 = []
    }
    if (!blocks2) {
        blocks2 = []
    }
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
                plr.world.getBlockStateId(new Vec3(x, y, z)).then(stateId => {
                    if (blocks1[0]) {
                        if (blocks2[0]) {
                            blocks1.forEach(block => {
                                if (block === stateId) {
                                    serv.setBlock(world, new Vec3(x, y, z), blocks2[Math.floor(Math.random()*blocks2.length)])
                                    serv.setBlock(world, pos1, blocks2[Math.floor(Math.random()*blocks2.length)])
                                    serv.setBlock(world, pos2, blocks2[Math.floor(Math.random()*blocks2.length)])
                                }
                            })
                        } else {
                            if (stateId !== 0) {
                                serv.setBlock(world, new Vec3(x, y, z), blocks1[Math.floor(Math.random()*blocks1.length)])
                                serv.setBlock(world, pos1, blocks1[Math.floor(Math.random()*blocks1.length)])
                                serv.setBlock(world, pos2, blocks1[Math.floor(Math.random()*blocks1.length)])
                            }
                        }
                    } else {
                        plr.world.getBlock(new Vec3(x, y, z)).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(world, new Vec3(x, y, z), 0)
                        })
                        plr.world.getBlock(pos1).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(world, pos1, 0)
                        })
                        plr.world.getBlock(pos2).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(world, pos2, 0)
                        })
                    }
                })
             }
        }
    }
    plr.chat(messages.blocksChanged.replace("0", String(blocksCount)))
}