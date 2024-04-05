const TEMP_BASE_URL = 'http://localhost:3000';

const fetchPosts = async (page) => {
    // const data = await fetch(`${TEMP_BASE_URL}/posts?_sort=-id`);
    const response = await fetch(`${TEMP_BASE_URL}/posts?_sort=-id&${page ? `_page=${page}&_per_page=2` : ""}`);
    const postData = await response.json();
    return postData;
}

const fetchPostsDetails = async (id) => {
    const response = await fetch(`${TEMP_BASE_URL}/posts/${id}`, {
        method: 'GET'
    });
    const postData = await response.json();
    return postData;
}

const addPost = async (newPost) => {
    const response = await fetch(`${TEMP_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    const newPostData = await response.json();
    return newPostData;
}

const deletePost = async (id) => {
    const response = await fetch(`${TEMP_BASE_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    const postData = await response.json();
    return postData;
}

const updatePost = async (post) => {
    const response = await fetch(`${TEMP_BASE_URL}/posts/${post?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    const newPostData = await response.json();
    return newPostData;
}

export {
    fetchPosts,
    fetchPostsDetails,
    addPost,
    deletePost,
    updatePost
}