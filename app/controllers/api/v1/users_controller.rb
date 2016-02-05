class Api::V1::UsersController < ApplicationController
  def create
    unless User.find_by(user_id: params[:user_id]).present?
      User.create params.permit(:email, :clientID, :picture, :user_id, :nickname)
    end
    render :json => {confirm: 'Successful'}
  end
end
