module.exports = (radius, partSize, thickness, toAdd) => {
	radius = radius || 10 
	partSize = partSize || 1
	thickness = thickness || radius
	let sphere = []
	let thicknessRadiusDifference = radius - thickness
	for (let x = -radius; x < radius; x++) {
		let powX = Math.pow(x, 2)
		for (let y = -radius; y < radius; y++) {
			let powY = Math.pow(y, 2)
			for (let z = -radius; z < radius; z++) {
				let powZ = Math.pow(z, 2)
				let radiusNum = Math.sqrt(powX + powY + powZ)
				let isInRadius = radiusNum > thicknessRadiusDifference && radiusNum <= radius
				if (isInRadius) {
                    sphere.push([(x*partSize)+toAdd.x, (y*partSize)+toAdd.y, (z*partSize)+toAdd.z])
				}
			}
		}
	}
	return sphere
}