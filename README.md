# ROBLOX-HttpService-API
A Node.js program that allows you to perform actions using a ROBLOX account using HttpService.

## Documentation

#### All of the following API endpoints are in JSON and require the specified parameters as well as an `authKey` parameter for authentication.

### Set user ranks in a group
#### POST /api/rbx/groups/setRank

Parameters:
- groupId
  - [integer] The groupId for the group
- userId
  - [integer] The userId for the user whose rank should be modified
- rank
  - [integer 1-254] The new rank for the user


### Handle join requests
#### POST /api/rbx/groups/handleJoinRequest

Parameters:
- groupId
  - [integer] The groupId for the group
- username
  - [string] The username of the user (not sure why ROBLOX's API uses a username, but it does)
- accept
  - [boolean] Whether or not to accept the user


### Exile a user
#### POST /api/rbx/groups/exile

Parameters:
- groupId
  - [integer] The groupId for the group
- userId
  - [integer] The userId for the user who should be exiled
- deletePosts
  - [boolean] [optional] Whether or not all of the wall posts made by the specified user should be deleted


### Update the group's shout
#### POST /api/rbx/groups/shout

Parameters:
- groupId
  - [integer] The groupId for the group
- message
  - [string] The shout message


### Make a post to the group's wall
#### POST /api/rbx/groups/post

Parameters:
- groupId
  - [integer] The groupId for the group
- message
  - [string] The wall post message
