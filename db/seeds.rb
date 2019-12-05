# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# users=User.all

# puts 'running seed'
users=User.create([
  {
    username: "ben",
    email:"bg@bg.com",
    password:"benny6"
  },
  {
    username: "kim",
    email:"kg@bg.com",
    password:"benny6"
  },
  {
    username: "joe",
    email:"jc@bg.com",
    password:"benny6"
  }
])
puts users[0].username
items = Item.create([
  {
    title: "Alternator",
    description: "Used alternator barely used, works as should from diesel truck",
    make:"Ford",
    model:"F350",
    year:2006,
    mptions: "diesel",
    user_id: 1
  },
  {
    title: "Brake rotors",
    description: "New, never used. Bought but never put on",
    make:"BMW",
    model:"328xi",
    year:2008,
    mptions: "328xi",
    user_id: 1
  },
  {
    title: "Starter",
    description: "Open box new",
    make:"Honda",
    model:"Civic",
    year:2010,
    mptions: "base",
    user_id: 2
  },
  {
    title: "Tail Light",
    description: "Used in good condition ",
    make:"Ford",
    model:"Escape",
    year:2008,
    mptions: "Limited",
    user_id: 3
  }
])

ItemImage.create([
{
  image_url: "https://images-na.ssl-images-amazon.com/images/I/41cSpYFER2L._SY355_.jpg",
  item_id: 1
},
{
  image_url: "https://contentinfo.autozone.com/znetcs/product-info/en/US/dur/DLG3520-6-10/image/2/",
  item_id: 1
},
{
  image_url: "https://www.brakelabs.com/images/powersport/file1/powersport-4rotors-d.jpg",
  item_id: 2
},
{
  image_url: "https://www.remmenbrakes.com/wp-content/uploads/2019/01/Series-100_1a.png",
  item_id: 2
},
{
  image_url: "https://cdn11.bigcommerce.com/s-3wx1hpzfo2/images/stencil/500x659/products/24525/36346/17957n-noframedsa__61970.1475532257.jpg?c=2&imbypass=on",
  item_id: 3
},
{
  image_url: "https://images-na.ssl-images-amazon.com/images/I/41pR0PpnlmL._SX425_.jpg",
  item_id: 3
}
])

SavedItem.create([
  {
    item_id: 1,
    user_id: 2
  },
  {
    item_id: 4,
    user_id: 1
  },
  {
    item_id: 4,
    user_id: 2
  }
])