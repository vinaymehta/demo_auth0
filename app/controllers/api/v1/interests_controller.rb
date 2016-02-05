class Api::V1::InterestsController < ApplicationController
  def index
    render :json => current_user.interests, each_serializer: InterestSerializer, root: false
  end

  def create
    current_user.interests.create(title: params[:title], reason: params[:reason])
    render :json => {message: 'Interest created successfully'}
  end

  def update
  end

  def show
  end
end
