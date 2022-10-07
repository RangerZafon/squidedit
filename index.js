const MinecraftData = require("minecraft-data")
const Vec3 = require("vec3")
let playersData = {}
let messages = {
    positionSet: {
        [0]: "Set first position at: ",
        [1]: "Set second position at: "
    },
    blocksChanged: "0 blocks changed"
}
const fillArea = (p1, p2, w, s, si, p) => {
    require("./src/fill")(p1, p2, w, s, si, p, playersData, messages)
}
const createSphere = (r, ps, t, ta) => {
    return require("./src/sphere")(r, ps, t, ta)
}
const createCylinder = (h, r, pta, ho) => {
    return require("./src/cylinder")(h, r, pta, ho)
}
const replaceArea = (p1, p2, w, s, b1, b2, p) => {
    return require("./src/replace")(p1, p2, w, s, b1, b2, p, playersData, messages)
}
let mcdata
function parseBlocks(blocks) {
    let result = []
    if (mcdata) {
        const split = blocks.split(",")
        split.forEach(item => {
            if (Number(item)) {
                if (mcdata.blocks[Number(item)]) {
                    result.push(mcdata.blocks[Number(item)].defaultState)
                } else {
                    result.push(Number(item))
                }
            } else {
                let block
                mcdata.blocksArray.forEach(arrBlock => {
                    if (arrBlock.name === item) {
                        block = arrBlock
                    }
                })
                if (block) {
                    result.push(block.defaultState)
                }
            }
        })
    }
    return result
}
module.exports.server = function(serv) {
    mcdata = require("minecraft-data")(serv._server.version)
    if (typeof serv.plugins.squidedit.settings === "object") {
        if (serv.plugins.squidedit.settings["messages"]) {
            messages = serv.plugins.squidedit.settings.messages
        }
    }
    // commands
    serv.commands.add({ // set
        base: "set",
        info: "Fills area with blocks",
        usage: "set <block || blocks> ex. blocks: 1,2,3",
        parse(str) {
          const args = str.split(" ")
          if(args.length != 1) return false
          return args
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                const username = plr.username
                if (playersData[username]) {
                    if (playersData[username].positions[0] && playersData[username].positions[1]) {
                        const positions = playersData[username].positions
                        const pos1 = positions[0], pos2 = positions[1]
                        let blocksToFill = parseBlocks(args[0])
                        fillArea(pos1, pos2, plr.world, serv, blocksToFill, plr)
                    }
                }
            }
        }
    })
    serv.commands.add({ //replace
        base: "replace",
        info: "Replaces blocks in area",
        usage: "replace <block || blocks> ex.blocks: 1,2,3 && <block || blocks> ex.blocks: 1,2,3; Air will be replaced if argument #2 don't specified; All arguments are optional",
        parse(str) {
            const args = str.split(" ")
            return args
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                const username = plr.username
                if (playersData[username].positions[0] && playersData[username].positions[1]) {
                    let blocks1 = [], blocks2 = []
                    if (args[0]) {
                        blocks1 = parseBlocks(args[0])
                    }
                    if (args[1]) {
                        blocks2 = parseBlocks(args[1])
                    }
                    replaceArea(playersData[username].positions[0], playersData[username].positions[1], plr.world, serv, blocks1, blocks2, plr)
                }
            }
        }
    })
    serv.commands.add({ // sphere
        base: "sphere",
        info: "Creates sphere",
        usage: "sphere <block || blocks> ex. blocks: 1,2,3 && <radius: int>",
        parse(str) {
          const args = str.split(" ")
          if(args.length != 2) return false
          return args
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                if (Number(args[1])) {
                    const blocksToMakeSphere = parseBlocks(args[0])
                    const sphere = createSphere(Number(args[1]), 1, 0, plr.position)
                    let blocksCount = 0
                    playersData[plr.username].history.undo = []
                    sphere.forEach(pos => {
                        blocksCount++
                        plr.world.getBlock(new Vec3(pos[0], pos[1], pos[2])).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(plr.world, new Vec3(Math.floor(pos[0]), Math.floor(pos[1]), Math.floor(pos[2])), blocksToMakeSphere[Math.floor(Math.random()*blocksToMakeSphere.length)])
                        })
                    })
                    plr.chat(messages.blocksChanged.replace("0", String(blocksCount)))
                }
            }
        }
    })
    serv.commands.add({ //hsphere
        base: "hsphere",
        info: "Creates hollow sphere",
        usage: "hsphere <block || blocks> ex. blocks: 1,2,3 && <radius: int>",
        parse(str) {
          const args = str.split(" ")
          if(args.length != 2) return false
          return args
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                if (Number(args[1])) {
                    const blocksToMakeSphere = parseBlocks(args[0])
                    const sphere = createSphere(Number(args[1]), 1, 1, plr.position)
                    let blocksCount = 0
                    playersData[plr.username].history.undo = []
                    sphere.forEach(pos => {
                        blocksCount++
                        plr.world.getBlock(new Vec3(pos[0], pos[1], pos[2])).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(plr.world, new Vec3(Math.floor(pos[0]), Math.floor(pos[1]), Math.floor(pos[2])), blocksToMakeSphere[Math.floor(Math.random()*blocksToMakeSphere.length)])
                        })
                    })
                    plr.chat(messages.blocksChanged.replace("0", String(blocksCount)))
                }
            }
        }
    })
    serv.commands.add({ //pos1
        base: "pos1",
        info: "Set first position to your location",
        usage: "pos1",
        parse(str) {
            return true
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                const pos = plr.position
                let x = pos.x, y = pos.y, z = pos.z
                setPosition(plr, new Vec3(Math.floor(x), Math.floor(y), Math.floor(z)), 0)
            }
        }
    })
    serv.commands.add({ //pos2
        base: "pos2",
        info: "Set second position to your location",
        usage: "pos2",
        parse(str) {
            return true
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                const pos = plr.position
                let x = pos.x, y = pos.y, z = pos.z
                setPosition(plr, new Vec3(Math.floor(x), Math.floor(y), Math.floor(z)), 1)
            }
        }
    })
    serv.commands.add({ //cyl
        base: "cyl",
        info: "Creates cylinder",
        usage: "cyl <block || blocks> ex. blocks: 1,2,3 && <height: int> <radius: int>",
        parse(str) {
            const args = str.split(" ")
            if(args.length != 3) return false
            return args
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                const pos = plr.position
                if (Number(args[1]) && Number(args[2])) {
                    const split = args[0].split(",")
                    let blocks = parseBlocks(args[0])
                    const cylinder = createCylinder(Number(args[1]), Number(args[2]), pos, false)
                    let blockscount = 0
                    playersData[plr.username].history.undo = []
                    cylinder.forEach(pos => {
                        blockscount++
                        plr.world.getBlock(pos).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(plr.world, pos, blocks[Math.floor(Math.random()*blocks.length)])
                        })
                    })
                    plr.chat(messages.blocksChanged.replace("0", String(blockscount)))
                }
            }
        }
    })
    serv.commands.add({ //hcyl
        base: "hcyl",
        info: "Creates hollow cylinder",
        usage: "hcyl <block || blocks> ex. blocks: 1,2,3 && <height: int> <radius: int>",
        parse(str) {
            const args = str.split(" ")
            if(args.length != 3) return false
            return args
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                const pos = plr.position
                if (Number(args[1]) && Number(args[2])) {
                    const split = args[0].split(",")
                    let blocks = parseBlocks(args[0])
                    split.forEach(item => {
                        if (Number(item)) {
                            blocks.push(mcdata.blocks[Number(item)].minStateId)
                        }
                    })
                    const cylinder = createCylinder(Number(args[1]), Number(args[2]), pos, true)
                    let blockscount = 0
                    playersData[plr.username].history.undo = []
                    cylinder.forEach(pos => {
                        blockscount++
                        plr.world.getBlock(pos).then(result => {
                            playersData[plr.username].history.undo.push(result)
                            serv.setBlock(plr.world, pos, blocks[Math.floor(Math.random()*blocks.length)])
                        })
                    })
                    plr.chat(messages.blocksChanged.replace("0", String(blockscount)))
                }
            }
        }
    })
    serv.commands.add({ //undo
        base: "undo",
        info: "Undo your last action",
        usage: "undo",
        parse(str) {
            return true
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                if (playersData[plr.username]) {
                    let data = playersData[plr.username]
                    if (data.history.undo) {
                        data.history.redo = []
                        data.history.undo.forEach(block => {
                            plr.world.getBlock(block.position).then(b => {
                                data.history.redo.push(b)
                            })
                            serv.setBlock(plr.world, block.position, block.stateId)
                        })
                    }
                }
            }
        }
    })
    serv.commands.add({ //redo
        base: "redo",
        info: "Redo your last action",
        usage: "redo",
        parse(str) {
            return true
        },
        action(args, ctx) {
            const plr = ctx.player
            if (plr) {
                if (playersData[plr.username]) {
                    let data = playersData[plr.username]
                    if (data.history.redo) {
                        data.history.undo = []
                        data.history.redo.forEach(block => {
                            plr.world.getBlock(block.position).then(b => {
                                data.history.undo.push(b)
                            })
                            serv.setBlock(plr.world, block.position, block.stateId)
                        })
                    }
                }
            }
        }
    })
}
function setPosition(player, pos, posToSet) {
    const username = player.username
    if (playersData[username]) {
        if (playersData[username].pos === 1) {
            playersData[username].pos = 0
        } else {
            playersData[username].pos = 1
        }
        if (posToSet) {
            playersData[username].pos = posToSet
        }
        player.chat(messages.positionSet[playersData[username].pos] + String(pos))
        playersData[username].positions[playersData[username].pos] = pos
    }
}
module.exports.player = function(player, serv) {
    player.on("spawned", () => {
        playersData[player.username] = {
            positions: {
                [0]: null,
                [1]: null
            },
            pos: 1,
            history: {
                undo: null,
                redo: null
            }
        }
        player.on("dug", (event) => {
            if (player.heldItem) {
                if (player.heldItem.name === "wooden_axe") {
                    const block = event.block
                    const position = event.position
                    serv.setBlock(player.world, position, block.stateId)
                    setPosition(player, position)
                }
            }
        })
    })
    player.on("disconnect", () => {
        delete playersData[player.username]
    })
}