# Close Issue Channel Script

## Command Line Usage

1. Make sure your environment variables are defined.
1. Run the following command.

```bash
node scripts/close-issue-channel --payload="{ \"number\": 180 }"
```

## GitHub Workflow Usage

```yaml
- run: node scripts/close-issue-channel --payload="${{ github.event.issue }}"
  env:
    DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
    GUILD_ID: ${{ secrets.GUILD_ID }}
    HUB_ID: ${{ secrets.HUB_ID }}
```

See `.github\workflows\close_issue_channel.yaml`.
