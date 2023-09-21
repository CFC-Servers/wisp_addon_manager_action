const fs = require("fs");
const core = require("@actions/core");
const ManageAddons = require("wisp_addon_manager").ManageAddons;

const nodeFetch = require("node-fetch");
declare global {
  var Headers: typeof nodeFetch.Headers;
  var fetch: typeof nodeFetch.default;
}
globalThis.Headers = nodeFetch.Headers;
globalThis.fetch = nodeFetch.default || nodeFetch;


const readControlFile = (path: string) => {
    try {
        return fs.readFileSync(path, "utf8");
    }
    catch (e) {
        throw e;
    }
}

try {
    console.log("Starting addon manager");

    const domain = core.getInput("domain");
    const uuid = core.getInput("uuid");
    const serverName = core.getInput("name");
    const token = core.getInput("token");
    const ghPAT = core.getInput("github-token");
    const alertWebhook = core.getInput("alert-webhook");
    const failureWebhook = core.getInput("failure-webhook");
    const controlFile = core.getInput("control-file");

    let controlFileContents
    if (controlFile) {
        controlFileContents = readControlFile(controlFile);
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
    }

    ManageAddons(config).then(() => {
        core.setOutput("success", true);
    });
}
catch (e) {
    console.error(e);

    if (e instanceof Error) {
        core.setFailed(e.message);
    } else if (typeof e === "string") {
        core.setFailed(e);
    } else {
        core.setFailed("Unknown error");
    }
}
