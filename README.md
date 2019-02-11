# ChatSpace


### Ruby 2.3.1
### Rails 5.2.1


## members table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null :false, foreign_key :true|
|group_id|integer|null :false, foreign_key :true|
### Association
- belongs_to :user
- belongs_to :group
## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|       |
|image|string|        |
|user_id|integer|null :false, foreign_key :true|
|group_id|integer|null :false, foreign_key :true|
### Association
- belongs_to :user
- belongs_to :group
## users table
|Column|Type|Options|
|------|----|-------|
|name|string|index :true, null :false, unique :true|
|email|string|null :false|
### Association
- has_many :messages
- has_many :members
- has_many :groups, through :members
## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|index :true,null :false, unique :true|
### Association
- has_many :messages
- has_many :members
- has_many :users, through :members
