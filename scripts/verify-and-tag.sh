# Exit if there is any error
set -e
# Echo all commands
set -x

# Calculate next tag number (1, 2, 3 ... )
LAST_TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
NEW_TAG=$((LAST_TAG + 1))

# Set the git user to the user that pushed the commit
git config --global user.email $(git --no-pager show -s --format='%ae' HEAD)
git config --global user.name "$(git --no-pager show -s --format='%an' HEAD)"

# Verify the commit
cd backend
# In CircleCI the service account key is in an environment variable. Move it to
# a file so we can use it
echo $SERVICE_ACCOUNT_KEY | base64 --decode > service-account-key.json
make verify

# Tag and push the tag
git tag $NEW_TAG
git push origin $NEW_TAG
