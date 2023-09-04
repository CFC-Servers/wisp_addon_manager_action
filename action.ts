import * as core from "@actions/core";
import { ManageAddons } from "wisp_addon_manager";

(async () => {
    try {
        const domain = core.getInput("domain");
        const uuid = core.getInput("uuid");
        const serverName = core.getInput("name");
        const token = core.getInput("token");
        const ghPAT = core.getInput("github-token");
        const alertWebhook = core.getInput("alert-webhook");
        const failureWebhook = core.getInput("failure-webhook");


        await ManageAddons({
            domain: domain,
            uuid: uuid,
            serverName: serverName,
            token: token,
            ghPAT: ghPAT,
            alertWebhook: alertWebhook,
            failureWebhook: failureWebhook
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
});
