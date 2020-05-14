const express = require('express');
const db = require("./userDb")
const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', (req, res) => {
  // NEW USER REQUEST METHOD
  const newUser = {
    name: req.body.name,
  }

  db.insert(newUser)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((user) => {
    res.status(500).json({
      message: "user could not be created",
    });
  });
});

router.post('/:id/posts', (req, res) => {
  // NEW POST REQUEST METHOD
  const newPost = {
    text: req.body.text,
    user_id: req.params.id,
  };

  postDb
    .insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User's post could not be created",
      });
    });
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // GETTING USER BY ID
  if(req.params.id) {
    db.getById(req.params.id)
    .then((userId) => {
      res.status(200).json(userId);
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    res.status(500).json({
      message:"the user witht this ID does not exist"
    })
  }
});

router.get('/:id/posts', (req, res) => {
  // GETTING POSTS BY ID
  if (req.params.id) {
    db.getUserPosts(req.params.id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(500).json({
      error: "The the post for this user could not be retrieved.",
    });
  }
});

router.delete('/:id', (req, res) => {
  // DELETING POST AND USER REQUEST
  db.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User failed to be deleted",
      });
    });
});

router.put('/:id', (req, res) => {
  // PUT REQUEST
  db.update(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({
      message: "User cannot be updated",
    });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
