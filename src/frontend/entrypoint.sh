#!/bin/bash
# no verbose
set +x
# config
envFilename='.env.production'
nextFolder='./.next/'
function apply_path {

    # get every env variable by line and check if it starts with ENV_
    envvars=$(env | grep '^ENV_')

    # if there is no env variable, exit
    if [ -z "$envvars" ]; then
        echo "No env variables found"
        exit 0
    fi

    # echo every envvars
    echo "Env variables found:"
    while read -r line; do
        configName=$(echo "$line" | cut -d'=' -f1)
        configValue=$(echo "$line" | cut -d'=' -f2)

        envValue=$(env | grep "^$configName=" | grep -oe '[^=]*$')

        if [ -n "$configValue" ] && [ -n "$envValue" ]; then
            echo "Setting $configName to $configValue"
            # sed -i "s/$configName=.*/$configName=$configValue/g" $envFilename
            find $nextFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
        fi

    done <<< "$envvars"

}
apply_path
echo "Starting Nextjs"
exec "$@"