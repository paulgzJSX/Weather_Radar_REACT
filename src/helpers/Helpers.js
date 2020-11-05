export function trimHeaderTitle(title) {
    const res = title.replace(/([A-Z])/g, " $1")
    return res.charAt(0).toUpperCase() + res.slice(1)
}


export const getMyCoordinates = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
        if (position) {
            resolve(position)
        } else {
            const error = new Error()
            error.code = 'Unable to get coordinates of your location'
            reject(error.code)
        }
    })
})


export function parseXML(data) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml")
    const timeNodes = xml.getElementsByTagName('time')

    let node = {}

    for (let i = 0; i < timeNodes[0].children.length; i++) {
        if (timeNodes[0].children[i].children.length) {
            const dataNode = timeNodes[0].children[i]
            node = { ...node, [dataNode.tagName]: fetchData(dataNode.children)}
        } else {
            const dataNode = timeNodes[1].children[i]
            node = { ...node, [dataNode.tagName]: fetchData(dataNode.children)}
        }
    }
    return node
}


export const fetchData = (locationNodes) => {
    const arr = Array.from(locationNodes).map(locationNode => {
        const location = locationNode.getAttribute('name')
        const stationType = locationNode.getAttribute('station_type')

        const childNode = locationNode.getElementsByTagName(locationNode.children[0].nodeName)
        const value = childNode[0].getAttribute('value')
        const unit = childNode[0].getAttribute('unit')

        return { location, value, stationType, unit }
    })

    locationNodes[0].parentElement.nodeName === 'lowestTemperatures'
        ? arr.sort((a, b) => a.value - b.value)
        : arr.sort((a, b) => b.value - a.value)

    return arr
}
