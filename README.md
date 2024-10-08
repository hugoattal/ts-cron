# Lite-CRON
Simple, lightweight, and dependency-free CRON library for TypeScript.

Packaged size: `2.78 kB` | Gzipped size: `1.02 kB`

## Installation
```bash
pnpm install lite-cron
```

## Supported formats

```
 .---------------- secondes (0 - 59)
 |  .------------- minute (0 - 59)
 |  |  .---------- hour (0 - 23)
 |  |  |  .------- day of month (1 - 31)
 |  |  |  |  .---- month (1 - 12)
 |  |  |  |  |  .- day of week (0 - 6) (Sunday=0)
 *  *  *  *  *  *
```

- `*` any value
- `*/n` every n values
- `n/m` every m values starting at n
- `n` specific value
- `n-m` range of values
- `n,m` list of values

Every missing value is considered as `0`.

### Example
- `0 0 * * * *` every hour
- `* * * *` every hour
- `*/6 * * *` every 6 hours
- `2/6 * * *` every 6 hours starting at 2pm
- `6 * * *` every day at 6am
- `6-8 * * *` every day at 6am, 7am and 8am
- `6,8 * * *` every day at 6am and 8am

## Usage

### Launch a job

```typescript
import { Cron } from "lite-cron";

const cron = new Cron({
    time: "0 0 */6 * * *",
    job: () => {
        console.log("Every 6 hours");
    }
});
```

```typescript
import { Cron } from "lite-cron";

const cron = new Cron({
    time: "0 0 */6 * * *",
    job: async () => {
        await myExpensiveJob();
    }
});
```

### Stop a job

```typescript
cron.stop();
```