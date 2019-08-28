exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is first post." }]
  });
};

exports.createPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //Create post in db

  res.status(201).json({
    message: "Post create succesfuly",
    post: { id: new Date().toISOString(), tile: title, content: content }
  });
};
