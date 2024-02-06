import { Router } from 'express'
const router = Router()
import { validateJWT } from '../middlewares/jwt_middleware.js'
import { validateLoginCredentials, login } from '../controllers/auth_controllers.js'
import { handleListBlogs, handleGetBlog, handleCreateBlog, handleUpdateBlog, handleDeleteBlog } from '../controllers/blog_controllers.js'

// Authorization Routes:
router.post('/login', [validateLoginCredentials, login])

// Blog Routes:
// Ignoring JWT check for viewing the blogs
router.get('/blogs', handleListBlogs)
router.get('/blogs/:blogid', handleGetBlog)

router.post('/blogs', [validateJWT, handleCreateBlog])
router.put('/blogs/:blogid', [validateJWT, handleUpdateBlog])
router.delete('/blogs/:blogid', [validateJWT, handleDeleteBlog])

export default router