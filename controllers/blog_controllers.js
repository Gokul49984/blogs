import { createBlog, deleteBlogByID, getBlogByID, listBlogs, updateBlogByID } from "../services/storage.js"

export function handleListBlogs(req, res) {
  return res.send(listBlogs());
}

export function handleGetBlog(req, res) {

  try {
    return res.send(getBlogByID(Number(req.params.blogid)));
  } catch (err) {
    return res.status(404).send({ err: "Blog not found" });
  }

}

function validateBlog(blog) {
  if (!blog.name) {
    return "Blog name is required"
  } else if (blog.name.length < 3 || blog.name.length > 36) {
    return "Blog name should contain 3 to 36 characters"
  }

  if (!blog.description) {
    return "Blog description is required"
  } else if (blog.name.description < 15 || blog.name.description > 500) {
    return "Blog description should contain 15 to 500 characters"
  }
  return
}

export function handleCreateBlog(req, res) {

  const err = validateBlog(req.body);
  if (err) {
    res.status(400).send({ err })
  }

  return res.send(createBlog(req.body));
}

export function handleUpdateBlog(req, res) {

  try {
    const err = validateBlog(req.body);
    if (err) {
      res.status(400).send({ err })
    }
    
    return res.send(updateBlogByID(Number(req.params.blogid), req.body));
  } catch (err) {
    return res.status(404).send({ err: "Blog not found" });
  }

}

export function handleDeleteBlog(req, res) {

  return res.send(deleteBlogByID(Number(req.params.blogid)));
}