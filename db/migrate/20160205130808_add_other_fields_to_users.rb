class AddOtherFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :clientID, :string
    add_column :users, :picture, :string
    add_column :users, :user_id, :string
    add_column :users, :nickname, :string
  end
end
