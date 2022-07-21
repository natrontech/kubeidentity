#!/bin/bash
# no verbose
set +x
# config
envFilename='.env.production'
nextFolder='./.next/'
function apply_path {
    # read all config file
    while read line; do
        # no comment or not empty
        if [ "${line:0:1}" == "#" ] || [ "${line}" == "" ]; then
            continue
        fi

        # split
        configName="$(cut -d'=' -f1 <<<"$line")"
        configValue="$(cut -d'=' -f2 <<<"$line")"
        # get system env
        envValue=$(env | grep "^$configName=" | grep -oe '[^=]*$')

        # if config found
        if [ -n "$configValue" ] && [ -n "$envValue" ]; then
            # replace all
            echo "Replace: ${configValue} with: ${envValue}"
            find $nextFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
        fi
    done <$envFilename
}
apply_path
echo "Starting Nextjs"
exec "$@"

# #!/bin/bash
# # no verbose
# set +x

# nextFolder='./.next/'
# touch .env

# # get all the environment variables starting with "NEXT_PUBLIC_"
# env | grep NEXT_PUBLIC_ | while read -r line; do
#     # split the variable into name and value
#     name=$(echo $line | cut -d'=' -f1)
#     value=$(echo $line | cut -d'=' -f2)
#     # set the environment variable in the container to .env file
#     echo "Replacing $name with $value"
#     echo $name=$value >> .env
# done
# echo "Starting Nextjs"
# exec "$@"
