# blog-api

MODELS

- User
  - name, password
  - Write validation with express-validator
  - Auth with passport/bycrypt
- Post
  - title, text, date, hidden (y/n), comments (array), unique url (virtual)
- Comment
  - name, text, date, post (they are attached to)

SYSTEM

- Test the schemas by manually adding some stuff
- Talk to front end with API
  - Do something minimal in React
  - including for to submit the whole thing
  - let's take some time and not limit ourselves to postman
- Create a second entry to actually publish posts and manage the website
