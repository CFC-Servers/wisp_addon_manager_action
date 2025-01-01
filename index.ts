const fs = require("fs")
const core = require("@actions/core")
const ManageAddons = require("wisp_addon_manager").ManageAddons

const nodeFetch = require("node-fetch")
declare global {
  var Headers: typeof nodeFetch.Headers
}
globalThis.Headers = nodeFetch.Headers
globalThis.fetch = nodeFetch.default || nodeFetch

const safeReadFile = (path: string) => {
    try {
        return fs.readFileSync(path, "utf8")
    }
    catch (e) {
        console.error(`Failed to read file at path: ${path}`)
        return null
    }
}

try {
    console.log("Starting addon manager")

    const domain = core.getInput("domain")
    const uuid = core.getInput("uuid")
    const serverName = core.getInput("name")
    const token = core.getInput("token")
    const ghPAT = core.getInput("github-token")
    const alertWebhook = core.getInput("alert-webhook")
    const failureWebhook = core.getInput("failure-webhook")
    const controlFile = core.getInput("control-file")
    const serverConfig = core.getInput("server-config")

    let controlFileContents
    if (controlFile) {
        controlFileContents = safeReadFile(controlFile)
    }

    let serverConfigContents
    if (serverConfig) {
        serverConfigContents = safeReadFile(serverConfig)
    }

    const config = {
        domain: domain,
        uuid: uuid,
        serverName: serverName,
        token: token,
        ghPAT: ghPAT,
        alertWebhook: alertWebhook,
        failureWebhook: failureWebhook,
        controlFile: controlFileContents,
        serverConfig: serverConfigContents
    }

    ManageAddons(config).then(() => {
        core.setOutput("success", true)
        process.exit(0)
    })
}
catch (e) {
    console.error(e)

    if (e instanceof Error) {
        core.setFailed(e.message)
    } else if (typeof e === "string") {
        core.setFailed(e)
    } else {
        core.setFailed("Unknown error")
    }

    process.exit(1)
}
