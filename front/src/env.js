const env = (key) => {
    if (process.env[key]) return process.env[key]

    return JSON.parse(window.env)[key]
}

export default env
