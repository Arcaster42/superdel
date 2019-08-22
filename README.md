# SuperDel Project

## Branches

Please work on branches separate from the master and request merges from there. Name your branch relevant to your role (i.e., frontend).

### Starting New Tasks

Create a new branch
```
git checkout -b <branchname>
```
Switch branches
```
git checkout <branchname>
```
Avoid working directly on master

### After Completing New Tasks

Pull from the master branch of the primary repository
```
git pull <arcaster42> master
```
Push to your branch
```
git push origin <branch>
```
Make the pull request

## Commits

Please provide comments for all your commits, and do not lump one comment in with multiple files if they are not strictly related. You can use VS Code source control options to provide commit comments for each individual file conveniently so that every commit is described accurately.

## Pull Requests

Before you make a PR, please pull from the root master to prevent any conflicts. Leave thorough details in the comment of the PR describing what is changed and why it is changed, especially if it is code done by someone else. At least two people should review a PR before merging, but one is sufficient when working remotely. Do not be afraid to request changes on a code review.

## Merge Conflicts

In case of conflicts, the files will have to be manually merged or a single file will be written to overwrite the other. This will lead to lost work, so please be careful not to push without pulling first. If a merge conflict occurs, speak with the person whose code is conflicting or with the tech lead.

## Project Setup

- Install packages
```
yarn 
```
- Migrate database
```
yarn migrate
```
- Seed database
```
yarn seed
```
- Start the back-end
```
yarn backend
```
- Start the front-end
```
yarn frontend
```

## Database

### Schema

users
-----
email (string)

first_name (string)

last_name (string)

address (string)

pass_hash (string)

staff (boolean)

phone (string)

orders
------
id (integer)

purchaser (string) -> users.email

staff (string) -> users.email

fulfilled (boolean)

price (integer)

ordered_items
-------------
id (integer)

order_id (integer) -> orders.id

product_name (string)

quantity (integer)

unit_price (integer)

## API

/api/users - POST
-----------------
Expected
- userObj
    - email
    - first_name
    - last_name
    - address
    - password

Returned
- userObj
    - email
    - first_name
    - last_name
    - address
    - password (null)
    - staff (bool)

/api/login - GET
----------------
Expected
- userObj 
    - userObj.email 
    - userObj.password

Returned
- user
    - userObj.email 
    - userObj.first_name 
    - userObj.last_name 
    - userObj.address
    - userObj.password (null)
    - userObj.staff (bool)

/api/orders - POST
-----------------
Expected
- userObj
    - email
    - first_name
    - last_name
    - address
    - password (null)
    - staff (bool)

- orderObj
    - items (Array)
    - quantity (Arr

Returned
- orderedItems (Array)
    - orderObj
        - order_id (orderId),
        - product_name (item),
        - quantity (int)

/api/orders - DELETE
-----------------
Expected
- orderObj
    - order_id (orderId),

Returned
- orderObj
    - order_id (orderId),
    - product_name (item),
    - quantity
    - price

/api/orders - GET
-----------------
Expected
- driverObj

Returned
- Array(orderObj)

/api/order - PATCH
------------------
Expected
- {driverObj, orderObj}

Returned
- id (number)

/api/order/fulfill - PATCH
--------------------------
Expected
- {driverObj, orderObj}

Returned
- id (number)

