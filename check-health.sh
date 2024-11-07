#!/bin/bash

# Base URLs for each service
BACKEND_URL="$1/health"
FRONTEND_URL="$2/api/health"
SOCKET_URL="$3/health"

# Maximum attempts and sleep interval in seconds
MAX_ATTEMPTS=5
SLEEP_INTERVAL=30

# Version file paths
BACKEND_VERSION_FILE="backend/VERSION"
FRONTEND_VERSION_FILE="frontend/VERSION"
SOCKET_VERSION_FILE="socket/VERSION"

# Function to get the version from a health endpoint
get_version() {
    local url=$1
    curl -s "$url" | jq -r '.version'
}

# Function to check if version matches the expected version
check_version_match() {
    local service_url=$1
    local version_file=$2
    local expected_version=$(cat "$version_file")
    local actual_version=$(get_version "$service_url")

    if [[ "$actual_version" == "$expected_version" ]]; then
        echo "Version at $service_url matches $version_file: Expected=$expected_version, Actual=$actual_version" >&2
        return 0
    else
        echo "Version mismatch at $service_url: Expected=$expected_version, Actual=$actual_version" >&2
        return 1
    fi
}

# Retry loop
attempt=1
while (( attempt <= MAX_ATTEMPTS )); do
    echo "Attempt $attempt of $MAX_ATTEMPTS" >&2
    
    backend_result=$(check_version_match "$BACKEND_URL" "$BACKEND_VERSION_FILE")
    backend_status=$?
    
    frontend_result=$(check_version_match "$FRONTEND_URL" "$FRONTEND_VERSION_FILE")
    frontend_status=$?
    
    socket_result=$(check_version_match "$SOCKET_URL" "$SOCKET_VERSION_FILE")
    socket_status=$?

    if [[ $backend_status -eq 0 && $frontend_status -eq 0 && $socket_status -eq 0 ]]; then
        echo "All versions match their respective VERSION files." >&2
        break
    else
        echo "Some versions did not match. Retrying in $SLEEP_INTERVAL seconds..." >&2
        sleep $SLEEP_INTERVAL
        (( attempt++ ))
    fi
done

# Final report
echo -e "\n## Version report:"
echo "Backend: Expected=$(cat $BACKEND_VERSION_FILE), Actual=$(get_version "$BACKEND_URL")"
echo "Frontend: Expected=$(cat $FRONTEND_VERSION_FILE), Actual=$(get_version "$FRONTEND_URL")"
echo "Socket: Expected=$(cat $SOCKET_VERSION_FILE), Actual=$(get_version "$SOCKET_URL")"

# Exit with an error if any version did not match after all attempts
if [[ $backend_status -ne 0 || $frontend_status -ne 0 || $socket_status -ne 0 ]]; then
    echo "Version check failed after $MAX_ATTEMPTS attempts. Exiting with error."
    exit 1
else
    echo "All services are up-to-date with the expected versions."
    exit 0
fi
