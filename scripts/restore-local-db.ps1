# Restores seed data from backup.sql into the local Docker Postgres container.
# Safe to re-run: skips schema errors when tables already exist; reloads COPY data.
param(
    [string]$ContainerName = "pay_wage_db",
    [string]$DbName = "Pay_Wage_DB",
    [string]$BackupPath = "$PSScriptRoot\..\backup.sql"
)

if (-not (Test-Path $BackupPath)) {
    Write-Error "backup.sql not found at $BackupPath"
    exit 1
}

$running = docker ps --filter "name=$ContainerName" --filter "status=running" -q
if (-not $running) {
    Write-Error "Container '$ContainerName' is not running. Start with: docker compose up -d"
    exit 1
}

Write-Host "Restoring data into $ContainerName / $DbName ..."
Get-Content $BackupPath |
    Where-Object { $_ -notmatch '^\\restrict' -and $_ -notmatch '^\\unrestrict' } |
    docker exec -i $ContainerName psql -U postgres -d $DbName -q

$count = docker exec $ContainerName psql -U postgres -d $DbName -t -c 'SELECT COUNT(*) FROM \"Worker\";'
Write-Host "Worker rows in database:$count"
Write-Host "Done. API check: http://localhost:3000/worker?page=1&limit=5"
