# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

rails new . --api --database=postgresql
npx create-react-app client
rails g scaffold User username:string email:string password_digest:string
rails db:create
rails g controller Authentication
rails g scaffold Item title description make model mptions year:integer user:references
rails g scaffold ItemImage image_url:text item:references
rails g model SavedItem user:references item:references
rails db:migrate
rails db:seed
bundle install
cd client
npm install axios\nnpm install react-router-dom