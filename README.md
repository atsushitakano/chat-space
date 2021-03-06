## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, add_index users,:email,uique:true|
|name|string|null: false, add_index users,:name,uique:true|
|password|text|null: false, add_index users,:password,uique:true|

### Association
- has_many :groups_users
- has_many :groups,through: :groups_users
- has_many :tweets

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :tweets
- has_many :groups_users
- has_many :users, through: :groups_users

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|
|text|text|
|user_id|reference|user, foreign_key: true|
|group_id|integer|group, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group