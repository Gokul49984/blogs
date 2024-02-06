import { error } from "console";

let blogs = [
    {
        "id": 1,
        "name": "REST API",
        "description": "Representational State Transfer (REST) is an architectural style that defines a set of constraints to be used for creating web services.",
        "modifiedAt": new Date()
    },
    {
        "id": 2,
        "name": "Node JS",
        "description": "Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more.",
        "modifiedAt": new Date()
    }
]

export function listBlogs() {
    return blogs.sort((x, y) => x.id > y.id ? 1 : -1);
}

export function getBlogByID(id) {
    const blog = blogs.find((val) => val.id === id);
    if (blog) {
        return blog;
    } else {
        throw error("Blog not found")
    }
}

function getNewBlogID() {
    if (blogs.length) {
        // sorting the blogs in descending order and incrementing the maximum value(id) by 1.
        return blogs.sort((x, y) => x.id > y.id ? -1 : 1)[0].id + 1;
    } else {
        // returning 1 if no blogs were stored.
        return 1;
    }
}

export function createBlog(arg) {

    // Initializing a new blog object to avoid storing unneccessary fields from the request.
    const blog = {
        id: getNewBlogID(),
        name: arg.name,
        description: arg.description,
        modifiedAt: new Date,
    }

    blogs.push(blog)

    return "Blog created successfully";
}

export function updateBlogByID(id, arg) {

    const foundObj = blogs.find((blog) => id === blog.id);
    if (foundObj) {

        // Initializing a new blog object to avoid storing unneccessary fields from the request.
        const updatedBlog = {
            id: id,
            name: arg.name || foundObj.name,
            description: arg.description || foundObj.description,
            modifiedAt: new Date(),
        }

        // Removing the existing object of that blog and appending the updated one
        blogs = [...(blogs.filter((blog) => id !== blog.id)), updatedBlog]

        return "Blog updated successfully";
    } else {
        throw error("Blog not found")
    }

}

export function deleteBlogByID(id) {
    // Ignoring existance checks, because it does not make any impact if does not exit.
    blogs = blogs.filter((blog) => id !== blog.id)

    return "Blog deleted successfully";
}
