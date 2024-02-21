# wisp_addon_manager_action
Action code for the wisp addon manager

## Usage
General idea (will expand later)
```yaml
name: Wisp Addon Updater (Manual)

on:
  workflow_call:
    inputs:
      server:
        type: string
      prettyName:
        type: string
      uuid:
        type: string

jobs:
  update-addons:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Wisp Addon Updater
        uses: CFC-Servers/wisp_addon_manager_action@v1
        with:
          domain: your.wisp.domain
          uuid: ${{ inputs.uuid }}
          name: ${{ inputs.prettyName }}
          token: ${{ secrets.WISP_TOKEN }}
          github-token: ${{ secrets.GH_TOKEN }}
          alert-webhook: ${{ secrets.ALERT_WEBHOOK }}
          failure-webhook: ${{ secrets.FAILURE_WEBHOOK }}
```

You can add secrets to a repository in the settings -> Secrets and variables -> Actions.
