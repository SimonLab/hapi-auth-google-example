module.exports = function custom_handler(request, reply, tokens, profile) {
  if(profile){
    // store the tokens in the Redis Database

    // store the user's profile in Database (ElasticSearch or Redis?):

    // reply to client with view:
    return reply("Hello " +profile.name.givenName + " You Logged in Using Goolge!");
  }
  else {
    return reply("Sorry, something went wrong, please try again.");
  }
}
