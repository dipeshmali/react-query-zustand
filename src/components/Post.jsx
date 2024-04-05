import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import { addPost, deletePost, fetchPosts, fetchPostsDetails, updatePost } from '../server/api'
import { useStore } from '../zustand_store/store';

const Post = () => {

    const { count } = useStore((state) => state)
    const { add, subtraction, savePost, posts } = useStore();

    const [value, setValue] = useState("")
    const [currentPage, setPage] = useState(1)
    const [postDetail, setPostDetails] = useState(null)
    const queryClient = useQueryClient();

    const isEditMode = Boolean(postDetail)

    const { data, isLoading, error, isFetching, isSuccess, isError, refetch } = useQuery({
        queryKey: ["posts", { page: currentPage, }],
        // queryFn: fetchPosts, // without pagination
        queryFn: () => fetchPosts(currentPage), // with pagination // Note : Whatever value pass in queryFn method should must be pass in queryKey 
        // staleTime : 1000 * 60 // it will cache this API data for 1 minute
        // refetchInterval: 1000 * 5 // every 5 second it will refetch
        // enabled : false // this option is useful when you dont want to call api in initial page load , and there is refetch method to call it later on 
    })

    useEffect(() => {
        if (data) {
            savePost(data)
        }
    }, [data])

    /** Mutation for Add New Post */
    const { mutate: addNewPost } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            /** React Caches data and to resolve stale data we need to inValidate post query dataset */
            queryClient?.invalidateQueries({
                queryKey: ['posts']
            });
            setPage(1);
            setValue("");
        }
    })

    /** Mutation for Update Post */
    const { mutate: modifyPost } = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient?.invalidateQueries({
                queryKey: ['posts']
            });
            setPostDetails(null);
            setValue("");
        }
    })

    /** Mutation for Remove Post */
    const { mutateAsync: deletePostNow } = useMutation({
        mutationKey: ["deletePost"],
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient?.invalidateQueries({
                queryKey: ['posts']
            })
        }
    })

    const removePost = async (id) => {
        await deletePostNow(id)
    }

    const getSelectedPostDetails = async (id) => {
        const detail = await queryClient.fetchQuery({
            queryKey: ["postDetails", { id: id }],
            queryFn: () => fetchPostsDetails(id)
        })
        setValue(detail?.title)
        setPostDetails(detail)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = {
            id: isEditMode ? postDetail?.id : (data?.items + 1).toString(),
            title: formData.get('title'),
            userId: 1
        }
        if (isEditMode) {
            modifyPost(payload)
        }
        else {
            addNewPost(payload)
        }
    }

    return (
        <React.Fragment>
            <h2>My Posts</h2>

            {isLoading && <span>Loading...</span>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="title"
                        placeholder='Enter post title'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    /> {' '}
                    <button type="submit">{postDetail ? 'Update' : 'Add'} Post</button>
                </div>
            </form>

            <ul style={{ padding: 0 }}>
                {data?.data?.map((post, index) => {
                    return (
                        <li key={post?.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ maxWidth: "150px", minWidth: "150px" }}>
                                &#9679;{' '}{post?.title}
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <BsFillTrashFill onClick={() => removePost(post?.id)} cursor="pointer" />&nbsp;
                                <BsFillPencilFill onClick={() => getSelectedPostDetails(post?.id)} cursor="pointer" />
                            </div>
                        </li>
                    )
                })}
            </ul>

            <button disabled={currentPage === 1} onClick={() => setPage(prev => prev - 1)}>Prev</button>
            <span style={{ padding: 5 }}>{currentPage}</span>
            <button disabled={data?.pages === currentPage} onClick={() => setPage(prev => prev + 1)}>Next</button>

            {/* <div style={{ marginTop: "10px" }}>
                <button onClick={() => add()}>Increment</button>
                {count}
                <button onClick={() => subtraction()}>Decrement</button>
            </div> */}

        </React.Fragment>
    )
}

export default Post