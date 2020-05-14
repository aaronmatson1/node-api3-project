const express = require('express');
const db = require("./userDb")
const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
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

router.post('/:id/posts', validateUser(), validatePost(), (req, res) => {
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

router.get('/:id', validateUser(), (req, res) => {
  // GETTING USER BY ID
  res.status(200).json(req.user);

  db.getById(req.params.id)
    .then((userId) => {
      res.status(200).json(userId);
    })
    .catch((err) => {
      console.log(err);
    })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // GETTING POSTS BY ID
  db.getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    SVGPathSegCurvetoQuadraticSmoothAbs((err) => {
      console.log(err);
    });
});

router.delete("/:id", validateUserId(), (req, res) => {
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

router.put("/:id", validateUserId(), (req, res) => {
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
  // Validating User ID
  return (req, res, next) => {
    db.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "User ID not found",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
}

function validateUser(req, res, next) {
  // Validating User
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Missing user data",
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "Missing user name",
      });
    } else {
      next();
    }
  };
}

function validatePost(req, res, next) {
  // Validating post
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Missing post data",
      });
    } else if (!req.body.text) {
      return res.status(400).json({
        errorMessage: "Missing required text field",
      });
    } else {
      next();
    }
  };
}

module.exports = router;
